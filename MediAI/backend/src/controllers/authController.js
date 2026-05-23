import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail, sendOTPEmail } from '../utils/mailer.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      if (!userExists.isVerified) {
        // Resend verification email if unverified
        const verificationToken = crypto.randomBytes(32).toString('hex');
        userExists.verificationToken = verificationToken;
        userExists.name = fullName;
        userExists.password = password; // Pre-save hook will hash it
        await userExists.save();
        
        try {
          await sendVerificationEmail(email, verificationToken);
          return res.status(200).json({ message: 'Account exists but unverified. A new verification link has been sent to your email.' });
        } catch (emailErr) {
          console.error("SMTP Error (signup resend):", emailErr.message);
          return res.status(500).json({ 
            message: 'Could not send verification email. Please check your email settings or try again later.'
          });
        }
      }
      return res.status(400).json({ message: 'An account with this email already exists. Please login.' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      name: fullName,
      email,
      password,
      verificationToken,
    });

    if (user) {
      try {
        await sendVerificationEmail(email, verificationToken);
        res.status(201).json({
          message: 'Signup successful! Please check your email (and spam folder) to verify your account before logging in.',
        });
      } catch (emailErr) {
        console.error("SMTP Error (signup verify):", emailErr.message);
        // Delete the user so they can try again when email is fixed
        await User.findByIdAndDelete(user._id);
        res.status(500).json({ 
          message: 'Account created but verification email could not be sent. Please try again or contact support.'
        });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired verification link. Please sign up again.' });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully! You can now login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res.status(401).json({ 
          message: 'Your email is not verified yet. Please check your inbox for the verification link.'
        });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password. Please try again.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No account found with this email address.' });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = Date.now() + 600000; // 10 minutes
    await user.save();

    try {
      await sendOTPEmail(email, otp);
      res.json({ message: 'OTP sent! Please check your email inbox and spam folder. It is valid for 10 minutes.' });
    } catch (emailErr) {
      console.error("SMTP Error (forgot password):", emailErr.message);
      // Clear the OTP since we cannot deliver it
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpires = undefined;
      await user.save();

      res.status(500).json({ 
        message: 'Could not send OTP email. This is a server configuration issue — please try again later or contact support.'
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ 
      email, 
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP. Please request a new one.' });

    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful! You can now login with your new password.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
