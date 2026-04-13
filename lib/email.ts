const ZEPTO_TOKEN = process.env.ZEPTOMAIL_TOKEN?.trim();
const FROM_EMAIL = (process.env.ZEPTOMAIL_FROM_EMAIL || "noreply@muskspace.com").trim();
const FROM_NAME = (process.env.ZEPTOMAIL_FROM_NAME || "Musk Space").trim();

export async function sendEmail({
    to,
    subject,
    htmlbody,
}: {
    to: string;
    subject: string;
    htmlbody: string;
}) {
    if (!ZEPTO_TOKEN) {
        console.error("[sendEmail] ZEPTOMAIL_TOKEN is not configured.");
        throw new Error("Email service is not configured.");
    }

    const res = await fetch("https://api.zeptomail.com/v1.1/email", {
        method: "POST",
        headers: {
            Authorization: `Zoho-enczapikey ${ZEPTO_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: { address: FROM_EMAIL, name: FROM_NAME },
            to: [{ email_address: { address: to } }],
            subject,
            htmlbody,
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("[sendEmail] ZeptoMail error:", res.status, err);
        throw new Error(`Failed to send email: ${err}`);
    }
}

export function buildWelcomeEmail(firstName: string): string {
    return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #0a0a0a; color: #ffffff; border-radius: 12px;">
  <h1 style="font-size: 22px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 4px;">
    Musk <span style="color: #e82127;">Space</span>
  </h1>
  <p style="color: #555; font-size: 12px; margin: 0 0 28px; letter-spacing: 2px; text-transform: uppercase;">Investment Platform</p>
  <hr style="border: none; border-top: 1px solid #222; margin-bottom: 28px;" />

  <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 12px;">Welcome, ${firstName}!</h2>
  <p style="color: #aaa; line-height: 1.7; margin: 0 0 24px;">
    Your Musk Space account has been successfully created. Our team is now reviewing your registration — you'll receive a confirmation email once your account is approved.
  </p>

  <div style="background: #111; border: 1px solid #2a2a2a; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
    <p style="margin: 0 0 8px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Account Status</p>
    <p style="margin: 0; font-size: 16px; font-weight: bold; color: #f59e0b;">Pending Approval</p>
    <p style="margin: 8px 0 0; font-size: 13px; color: #666;">This usually takes up to 24 hours.</p>
  </div>

  <p style="color: #888; font-size: 13px; margin-bottom: 8px;">Once approved, you'll have full access to:</p>
  <ul style="color: #888; font-size: 13px; line-height: 2; padding-left: 20px; margin: 0 0 28px;">
    <li>AI-powered investment plans with competitive returns</li>
    <li>Deposits, withdrawals &amp; portfolio management</li>
    <li>Exclusive Tesla vehicle and energy product financing</li>
    <li>Real-time transaction tracking and analytics</li>
  </ul>

  <hr style="border: none; border-top: 1px solid #222; margin-bottom: 20px;" />
  <p style="color: #444; font-size: 11px; margin: 0;">If you did not create this account, please disregard this email. &copy; Musk Space</p>
</div>`;
}

export function buildApprovalEmail(firstName: string): string {
    const loginUrl = `${process.env.NEXTAUTH_URL || "https://muskspace.pro"}/invest/login`;
    return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #0a0a0a; color: #ffffff; border-radius: 12px;">
  <h1 style="font-size: 22px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 4px;">
    Musk <span style="color: #e82127;">Space</span>
  </h1>
  <p style="color: #555; font-size: 12px; margin: 0 0 28px; letter-spacing: 2px; text-transform: uppercase;">Investment Platform</p>
  <hr style="border: none; border-top: 1px solid #222; margin-bottom: 28px;" />

  <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 12px;">Your Account is Approved, ${firstName}!</h2>
  <p style="color: #aaa; line-height: 1.7; margin: 0 0 24px;">
    Great news! Your Musk Space account has been reviewed and approved. You now have full access to the platform and can start investing today.
  </p>

  <div style="background: #0d1f0d; border: 1px solid #1a3a1a; border-radius: 8px; padding: 20px; margin-bottom: 28px;">
    <p style="margin: 0 0 8px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Account Status</p>
    <p style="margin: 0; font-size: 16px; font-weight: bold; color: #22c55e;">Active</p>
  </div>

  <a href="${loginUrl}" style="display: inline-block; background-color: #e82127; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 13px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 28px;">
    Log In to Your Account
  </a>

  <hr style="border: none; border-top: 1px solid #222; margin-bottom: 20px;" />
  <p style="color: #444; font-size: 11px; margin: 0;">If you did not create this account, please contact support. &copy; Musk Space</p>
</div>`;
}
