const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Entwined" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your Entwined account',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;">
        <h2>Welcome to Entwined 📚</h2>
        <p>Click the button below to verify your email address.
           This link expires in 24 hours.</p>
        <a href="${verifyUrl}"
           style="display:inline-block;background:#1D9E75;color:#fff;
                  padding:12px 24px;border-radius:6px;text-decoration:none;">
          Verify Email
        </a>
        <p style="margin-top:16px;color:#888;">
          If you didn't sign up, ignore this email.
        </p>
      </div>
    `,
  });
};

module.exports = sendVerificationEmail;
