import { logger } from "@/config/logger";
import { emailQueue } from "@/jobs/queues/email.queue";
import { User } from "@/models/user.model";
import { clearAuthCookies, setAuthCookies } from "@/utils/cookies";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  handleZodError,
} from "@/utils/core";
import { generateHash } from "@/utils/helper";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import {
  validateLogin,
  validateRegister,
  validateResendOtp,
  validateVerifyEmail,
} from "@/validations/auth.validations";
import { StatusCodes } from "http-status-codes";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = handleZodError(validateRegister(req.body));

  logger.info("User registration attempt", { email });

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn("Registration failed - email already exists", { email });
    throw new ApiError(
      StatusCodes.CONFLICT,
      "An account with this email already exists. Please sign in or use a different email address."
    );
  }

  const user = await User.create({ name, email, password });
  logger.info("User created successfully", { userId: user._id, email });

  // Generate OTP
  const { otp } = user.generateOtpWithExpiry();
  logger.info("OTP generated for user", { userId: user._id });

  // Queue verification email
  try {
    await emailQueue.add("sendVerificationMail", {
      email: user.email,
      name: user.name,
      otp,
    });
    logger.info("Verification email queued", { userId: user._id });
  } catch (error) {
    logger.error("Failed to queue verification email", {
      userId: user._id,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Continue registration even if email fails as user can request resend

  // Save user to db
  await user.save();
  logger.info("User registration completed", { userId: user._id });

  const response = new ApiResponse(
    StatusCodes.CREATED,
    "Registration successful! A verification code has been sent to your email. Please check your inbox to verify your account.",
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      onboardingCompleted: user.onboardingCompleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  );

  res.status(response.statusCode).json(response);
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = handleZodError(validateVerifyEmail(req.body));

  logger.info("Email verification attempt", { email });

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    logger.warn("Verification failed - user not found", { email });
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No account found with this email address. Please check your email or register for a new account."
    );
  }

  // Check if already verified
  if (user.isEmailVerified) {
    logger.info("Email already verified", { userId: user._id });
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Your email is already verified. You can proceed to complete your profile."
    );
  }

  // Verify OTP
  const isOtpCorrect = user.verifyOtp(otp);
  if (!isOtpCorrect) {
    logger.warn("Invalid OTP provided", { userId: user._id });
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "The verification code you entered is invalid or has expired. Please request a new code."
    );
  }

  // Clear OTP and mark as verified
  user.clearOtp();
  user.isEmailVerified = true;

  await user.save();
  logger.info("Email verified successfully", { userId: user._id });

  const response = new ApiResponse(
    StatusCodes.OK,
    "Email verified successfully! You can now complete your profile to get started",
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      onboardingCompleted: user.onboardingCompleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  );

  res.status(response.statusCode).json(response);
});

export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = handleZodError(validateResendOtp(req.body));

  logger.info("OTP resend request", { email });

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    logger.warn("OTP resend failed - user not found", { email });
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No account found with this email address. Please register first."
    );
  }

  // Check if already verified
  if (user.isEmailVerified) {
    logger.info("OTP resend failed - email already verified", {
      userId: user._id,
    });
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Your email is already verified"
    );
  }

  // Check if OTP was recently sent
  const now = Date.now();
  const thirtyMinMs = 30 * 60 * 1000; // 30 min validity
  const oneMinMs = 1 * 60 * 1000; // 1 min cooldown

  if (
    user.otpExpiry &&
    user.otpExpiry.getTime() - now > thirtyMinMs - oneMinMs
  ) {
    const timeLeftMs =
      user.otpExpiry.getTime() - now - (thirtyMinMs - oneMinMs);
    const timeLeftSec = Math.ceil(timeLeftMs / 1000);

    throw new ApiError(
      StatusCodes.TOO_MANY_REQUESTS,
      `Please wait ${timeLeftSec} second(s) before requesting a new verification code.`
    );
  }

  // Generate new OTP
  const { otp } = user.generateOtpWithExpiry();
  logger.info("New OTP generated", { userId: user._id });

  // Queue verification email
  try {
    await emailQueue.add("sendVerificationMail", {
      name: user.name,
      email: user.email,
      otp,
    });
    logger.info("Verification email queued", { userId: user._id });
  } catch (error) {
    logger.error("Failed to queue verification email", {
      userId: user._id,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to send verification email. Please try again later."
    );
  }

  // Save updated user
  await user.save();
  logger.info("OTP resent successfully", { userId: user._id });

  const response = new ApiResponse(
    StatusCodes.OK,
    "A new verification code has been sent to your email. Please check your inbox.",
    null
  );

  res.status(response.statusCode).json(response);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = handleZodError(validateLogin(req.body));

  logger.info("Login attempt", { email });

  // Find user
  const user = await User.findOne({ email }).populate("skills");
  if (!user) {
    logger.warn("Login failed - user not found", { email });
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  // Verify password
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    logger.warn("Login failed - incorrect password", { userId: user._id });
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    logger.warn("Login failed - email not verified", { userId: user._id });

    const response = new ApiResponse(
      StatusCodes.OK,
      "Please verify your email before logging in",
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        onboardingCompleted: user.onboardingCompleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    );

    return res.status(response.statusCode).json(response);
  }

  // Check if onboarding is completed
  if (!user.onboardingCompleted) {
    logger.warn("Login failed - onboarding incomplete", {
      userId: user._id,
    });

    const response = new ApiResponse(
      StatusCodes.OK,
      "Please complete your profile to continue",
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        onboardingCompleted: user.onboardingCompleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    );
    return res.status(response.statusCode).json(response);
  }

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set auth cookies
  setAuthCookies(res, accessToken, refreshToken);

  user.refreshToken = generateHash(refreshToken);
  await user.save();

  logger.info("Login successful", { userId: user._id });

  const response = new ApiResponse(StatusCodes.OK, "Login successful!", user);

  res.status(response.statusCode).json(response);
});

export const logout = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  logger.info("Logout request", { userId });

  clearAuthCookies(res);

  // Invalidate refresh token in db
  if (userId) {
    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
  }

  logger.info("Logout successful", { userId });

  const response = new ApiResponse(
    StatusCodes.OK,
    "You have been logged out successfully",
    null
  );

  res.status(response.statusCode).json(response);
});
