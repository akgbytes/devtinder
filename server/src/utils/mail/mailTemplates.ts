export const otpVerificationTemplate = (
  username: string,
  otp: string,
  brandColor: string = "#E94057"
) => ({
  subject: "Your DevTinder Verification Code",
  text: `Hi ${username},

Your verification code for DevTinder is: ${otp}

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email or contact our support team.

Happy coding and connecting!
- The DevTinder Team`,
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DevTinder - Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f7f7f7; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f7f7f7; padding:40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header with Logo -->
            <tr>
              <td align="center" style="background:linear-gradient(135deg, ${brandColor} 0%, #ff6b6b 100%); padding:40px 20px;">
                <h1 style="margin:0; font-size:28px; font-weight:bold; color:#ffffff; letter-spacing:-0.5px;">DevTinder</h1>
                <p style="margin:8px 0 0; font-size:14px; color:rgba(255,255,255,0.9);">Where Developers Connect</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:40px 30px; color:#333333;">
                <h2 style="margin:0 0 15px; font-size:24px; font-weight:600; color:#1a1a1a; text-align:center;">
                  Verify Your Email
                </h2>
                <p style="margin:0 0 30px; font-size:16px; line-height:1.6; color:#555555; text-align:center;">
                  Hi <strong>${username}</strong>,<br/>
                  Use the code below to verify your DevTinder account:
                </p>
                
                <!-- OTP Box -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:30px 0;">
                  <tr>
                    <td align="center">
                      <div style="background:linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border:2px dashed ${brandColor}; border-radius:12px; padding:25px; display:inline-block;">
                        <div style="font-size:42px; font-weight:bold; letter-spacing:8px; color:${brandColor}; font-family:'Courier New', monospace;">
                          ${otp}
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
                
                <!-- Expiry Notice -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:25px 0;">
                  <tr>
                    <td align="center" style="background:#fff3cd; border-left:4px solid #ffc107; padding:15px; border-radius:6px;">
                      <p style="margin:0; font-size:14px; color:#856404; line-height:1.5;">
                      <strong>Important:</strong> This code expires in <strong>15 minutes</strong>
                      </p>
                    </td>
                  </tr>
                </table>
                
                <p style="margin:25px 0 0; font-size:14px; line-height:1.6; color:#666666; text-align:center;">
                  If you didn't request this code, please ignore this email or 
                  <a href="mailto:support@devtinder.com" style="color:${brandColor}; text-decoration:none; font-weight:600;">contact our support team</a>.
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td align="center" style="padding:30px 20px; background:#1a1a1a; color:#ffffff;">
                <p style="margin:0 0 10px; font-size:14px;">
                  <a href="#" style="color:#ffffff; text-decoration:none; margin:0 10px;">About</a>
                  <span style="color:#666666;">|</span>
                  <a href="#" style="color:#ffffff; text-decoration:none; margin:0 10px;">Help Center</a>
                  <span style="color:#666666;">|</span>
                  <a href="#" style="color:#ffffff; text-decoration:none; margin:0 10px;">Privacy</a>
                </p>
                <p style="margin:10px 0 0; font-size:12px; color:#999999;">
                  &copy; ${new Date().getFullYear()} DevTinder. All rights reserved.
                </p>
                <p style="margin:10px 0 0; font-size:12px; color:#999999;">
                  Made with ❤️ for the developer community
                </p>
              </td>
            </tr>
            
          </table>
          
          <!-- Extra Footer Text -->
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;">
            <tr>
              <td align="center" style="font-size:12px; color:#999999; line-height:1.5;">
                <p style="margin:0;">
                  This email was sent to you because you signed up for DevTinder.<br/>
                  If you have questions, reply to this email or visit our <a href="#" style="color:${brandColor}; text-decoration:none;">Help Center</a>.
                </p>
              </td>
            </tr>
          </table>
          
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
});

// Welcome Email Template
export const welcomeEmailTemplate = (
  username: string,
  brandColor: string = "#E94057"
) => ({
  subject: "Welcome to DevTinder - Let's Get Started! 🚀",
  text: `Hi ${username},

Welcome to DevTinder! We're excited to have you join our community of passionate developers.

Here's what you can do next:
- Complete your profile
- Add your skills and projects
- Start connecting with other developers
- Explore collaboration opportunities

Let's build something amazing together!

- The DevTinder Team`,
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to DevTinder</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f7f7f7; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f7f7f7; padding:40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:linear-gradient(135deg, ${brandColor} 0%, #ff6b6b 100%); padding:50px 20px;">
                <h1 style="margin:0 0 10px; font-size:36px; font-weight:bold; color:#ffffff;">Welcome to DevTinder! 🎉</h1>
                <p style="margin:0; font-size:16px; color:rgba(255,255,255,0.9);">Where Developers Connect & Collaborate</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:40px 30px;">
                <p style="margin:0 0 20px; font-size:18px; color:#333333;">
                  Hi <strong>${username}</strong>,
                </p>
                <p style="margin:0 0 25px; font-size:16px; line-height:1.6; color:#555555;">
                  We're thrilled to have you join our community of passionate developers! DevTinder is your platform to connect, collaborate, and grow with fellow developers from around the world.
                </p>
                
                <!-- CTA Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:30px auto;">
                  <tr>
                    <td align="center" style="background:${brandColor}; border-radius:8px; box-shadow:0 4px 10px rgba(233,64,87,0.3);">
                      <a href="#" target="_blank" 
                        style="display:inline-block; padding:16px 40px; font-size:16px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px;">
                        Complete Your Profile
                      </a>
                    </td>
                  </tr>
                </table>
                
                <!-- Features Grid -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:40px 0;">
                  <tr>
                    <td width="50%" style="padding:15px; vertical-align:top;">
                      <div style="text-align:center;">
                        <div style="font-size:32px; margin-bottom:10px;">🤝</div>
                        <h3 style="margin:0 0 8px; font-size:16px; font-weight:600; color:#333;">Connect</h3>
                        <p style="margin:0; font-size:14px; color:#666; line-height:1.5;">Meet developers with similar interests and skills</p>
                      </div>
                    </td>
                    <td width="50%" style="padding:15px; vertical-align:top;">
                      <div style="text-align:center;">
                        <div style="font-size:32px; margin-bottom:10px;">💻</div>
                        <h3 style="margin:0 0 8px; font-size:16px; font-weight:600; color:#333;">Collaborate</h3>
                        <p style="margin:0; font-size:14px; color:#666; line-height:1.5;">Work together on exciting projects and ideas</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" style="padding:15px; vertical-align:top;">
                      <div style="text-align:center;">
                        <div style="font-size:32px; margin-bottom:10px;">📚</div>
                        <h3 style="margin:0 0 8px; font-size:16px; font-weight:600; color:#333;">Learn</h3>
                        <p style="margin:0; font-size:14px; color:#666; line-height:1.5;">Share knowledge and grow your skills</p>
                      </div>
                    </td>
                    <td width="50%" style="padding:15px; vertical-align:top;">
                      <div style="text-align:center;">
                        <div style="font-size:32px; margin-bottom:10px;">🚀</div>
                        <h3 style="margin:0 0 8px; font-size:16px; font-weight:600; color:#333;">Build</h3>
                        <p style="margin:0; font-size:14px; color:#666; line-height:1.5;">Create amazing projects with your network</p>
                      </div>
                    </td>
                  </tr>
                </table>
                
                <p style="margin:30px 0 0; font-size:16px; line-height:1.6; color:#555555;">
                  Ready to get started? Complete your profile and start exploring!
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td align="center" style="padding:30px 20px; background:#1a1a1a; color:#ffffff;">
                <p style="margin:0 0 10px; font-size:14px;">
                  Need help? <a href="mailto:support@devtinder.com" style="color:${brandColor}; text-decoration:none;">Contact Support</a>
                </p>
                <p style="margin:10px 0 0; font-size:12px; color:#999999;">
                  &copy; ${new Date().getFullYear()} DevTinder. All rights reserved.
                </p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
});

// Password Reset Template
export const passwordResetTemplate = (
  resetLink: string,
  username: string,
  brandColor: string = "#E94057"
) => ({
  subject: "Reset Your DevTinder Password",
  text: `Hi ${username},

We received a request to reset your DevTinder password.

Click this link to reset your password: ${resetLink}

This link will expire in 1 hour.

If you didn't request this, please ignore this email and your password will remain unchanged.

- The DevTinder Team`,
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f7f7f7; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f7f7f7; padding:40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:${brandColor}; padding:30px 20px;">
                <h1 style="margin:0; font-size:24px; font-weight:bold; color:#ffffff;">🔐 Password Reset</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:40px 30px;">
                <p style="margin:0 0 20px; font-size:16px; color:#333333;">
                  Hi <strong>${username}</strong>,
                </p>
                <p style="margin:0 0 25px; font-size:16px; line-height:1.6; color:#555555;">
                  We received a request to reset your DevTinder password. Click the button below to create a new password:
                </p>
                
                <!-- Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:30px auto;">
                  <tr>
                    <td align="center" style="background:${brandColor}; border-radius:8px;">
                      <a href="${resetLink}" target="_blank" 
                        style="display:inline-block; padding:16px 40px; font-size:16px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                </table>
                
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:25px 0;">
                  <tr>
                    <td align="center" style="background:#fff3cd; border-left:4px solid #ffc107; padding:15px; border-radius:6px;">
                      <p style="margin:0; font-size:14px; color:#856404;">
                        ⏱️ This link expires in <strong>1 hour</strong>
                      </p>
                    </td>
                  </tr>
                </table>
                
                <p style="margin:25px 0 0; font-size:14px; line-height:1.6; color:#666666;">
                  If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td align="center" style="padding:30px 20px; background:#1a1a1a; color:#ffffff;">
                <p style="margin:0 0 10px; font-size:14px;">
                  Need help? <a href="mailto:support@devtinder.com" style="color:${brandColor}; text-decoration:none;">Contact Support</a>
                </p>
                <p style="margin:10px 0 0; font-size:12px; color:#999999;">
                  &copy; ${new Date().getFullYear()} DevTinder. All rights reserved.
                </p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
});
