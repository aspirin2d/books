export interface VerificationEmailParams {
  firstName: string;
  serviceName: string;
  verificationLink: string;
  supportEmail: string;
}

export interface VerificationEmail {
  subject: string;
  text: string;
  html: string;
}

/**
 * Generate the email verification message
 */
export function verificationEmail({
  firstName,
  serviceName,
  verificationLink,
  supportEmail,
}: VerificationEmailParams): VerificationEmail {
  const subject = `${serviceName}: Please verify your email address`;

  const text = `
Hi ${firstName},

Thank you for signing up for ${serviceName}! 🎉

To complete your registration and secure your account, please verify your email by visiting this link:
${verificationLink}

This link will expire in 24 hours. If you didn’t create an account with us, no further action is required.

If you have any questions, just reply to this email or reach out to us at ${supportEmail}.

Welcome aboard!
The ${serviceName} Team
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
  <body style="font-family: sans-serif; line-height: 1.5;">
    <p>Hi ${firstName},</p>
    <p>Thank you for signing up for <strong>${serviceName}</strong>! 🎉</p>
    <p>
      To complete your registration and secure your account, please verify your email by clicking the button below:
    </p>
    <p style="text-align: center;">
      <a
        href="${verificationLink}"
        style="
          display: inline-block;
          padding: 12px 24px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        "
      >
        Verify Email
      </a>
    </p>
    <p>If the button above doesn’t work, copy and paste this URL into your browser:</p>
    <p>
      <a href="${verificationLink}">${verificationLink}</a>
    </p>
    <p>
      This link will expire in <strong>24 hours</strong>. If you didn’t create an account with us,
      no further action is required.
    </p>
    <p>
      If you have any questions, reply to this email or contact our support team at
      <a href="mailto:${supportEmail}">${supportEmail}</a>.
    </p>
    <p>Welcome aboard!<br>The ${serviceName} Team</p>
  </body>
</html>
  `.trim();

  return { subject, text, html };
}
