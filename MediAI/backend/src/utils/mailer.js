import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: `"MediPredict AI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - MediPredict AI',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e7ff; border-radius: 12px;">
        <h2 style="color: #312e81;">Welcome to MediPredict AI</h2>
        <p>Please click the button below to verify your email address and activate your account:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Verify Email Address</a>
        <p style="margin-top: 20px; color: #64748b; font-size: 14px;">If you did not create an account, you can safely ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"MediPredict AI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Password Reset OTP - MediPredict AI',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e7ff; border-radius: 12px;">
        <h2 style="color: #312e81;">Password Reset Request</h2>
        <p>You requested a password reset. Use the following 6-digit One-Time Password (OTP) to reset your password:</p>
        <div style="font-size: 32px; font-weight: bold; color: #3b82f6; padding: 16px; background-color: #f8fafc; border-radius: 8px; text-align: center; letter-spacing: 8px;">
          ${otp}
        </div>
        <p style="margin-top: 20px; color: #64748b; font-size: 14px;">This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
