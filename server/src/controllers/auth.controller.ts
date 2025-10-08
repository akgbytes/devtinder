import { logger } from "@/config/logger";
import { emailQueue } from "@/jobs/queues/email.queue";
import { User } from "@/models/user.model";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  handleZodError,
} from "@/utils/core";
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

  // Advance onboarding progress
  user.advanceOnboarding();
  const onboarding = user.getOnboardingProgress();

  // Save user to db
  await user.save();
  logger.info("User registration completed", { userId: user._id });

  const response = new ApiResponse(
    StatusCodes.CREATED,
    "Registration successful! A verification code has been sent to your email. Please check your inbox to verify your account.",
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      onboarding,
    }
  );

  res.status(response.statusCode).json(response);
});

export const verifyEmail = asyncHandler(async (req, res) => {
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
  user.advanceOnboarding();
  const onboarding = user.getOnboardingProgress();

  await user.save();
  logger.info("Email verified successfully", { userId: user._id });

  const response = new ApiResponse(
    StatusCodes.OK,
    "Email verified successfully! You can now complete your profile to get started.",
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      onboarding,
    }
  );

  res.status(response.statusCode).json(response);
});

export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = handleZodError(validateResendOtp(req.body));

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(4, "");

  if (user.isEmailVerified) throw new ApiError(1, "");

  // generate otp and save to db
  const { otp } = user.generateOtpWithExpiry();

  emailQueue.add("sendVerificationMail", {
    name: user.baseModelName,
    email: user.email,
    otp,
  });

  await user.save();

  const response = new ApiResponse(
    StatusCodes.OK,
    "OTP resent successfully to your email",
    null
  );

  res.status(response.statusCode).json(response);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = handleZodError(validateLogin(req.body));

  const user = await User.findOne({ email });

  if (!user)
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  // const token = user.generateJWT();

  // res.cookie("token", token, {
  //   maxAge: 60 * 60 * 1000, // 1 hour
  // });

  const response = new ApiResponse(StatusCodes.OK, "Login successful", user);
  res.status(response.statusCode).json(response);
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  const response = new ApiResponse(
    StatusCodes.OK,
    "Logged out successfully",
    null
  );

  res.status(response.statusCode).json(response);
});
