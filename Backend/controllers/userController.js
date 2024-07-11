import dotenv from 'dotenv';
dotenv.config();

import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../Models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { UserVerification } from "../Models/userVerification.js";
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import path from 'path';
import { config } from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
config({ path: "./config/config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


console.log('AUTH_EMAIL:', process.env.AUTH_EMAIL);
console.log('AUTH_PASSWORD:', process.env.AUTH_PASSWORD);

// nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  }
});

// testing success
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }

  const universityDomain = 'etu.uae.ac.ma';
  if (!email.endsWith(`@${universityDomain}`)) {
    return next(new ErrorHandler("Only institutional email can be accepted!"));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
    verified: false
  });

  await sendVerificationEmail(user, res, next);
  if (!res.headersSent) {
    sendToken(user, 201, res, "User Registered!");
  }
});

//send verification code
export const sendVerificationEmail = async ({ _id, email }, res, next) => {
  const currentUrl = "http://localhost:4000/api/v1/user/";
  const uniqueString = uuidv4() + _id;

  // Mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Verify your email address to complete the signup and log into your account.</p>
           <p>This link <b>expires in 6 hours</b>.</p>
           <p>Click <a href="${currentUrl}verify/${_id}_${uniqueString}">here</a> to continue.</p>`
  };

  try {
    // Hash the unique string
    const saltRounds = 10;
    const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);

    // Set values in the userVerification collection
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });

    await newVerification.save();
    await transporter.sendMail(mailOptions);

    if (!res.headersSent) {
      res.json({
        status: "PENDING",
        message: "Verification email sent"
      });
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return next(new ErrorHandler("Verification email failed", 500));
    }
  }
};

// Verify email route
export const verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const { verificationData } = req.params;
  const [userId, uniqueString] = verificationData.split('_');

  console.log(`Verification attempt for userId: ${userId} with uniqueString: ${uniqueString}`);

  try {
    const result = await UserVerification.findOne({ userId });

    if (!result) {
      console.log("No matching user verification record found");
      return res.json({
        status: "FAILED",
        message: "Account record doesn't exist or has been verified already. Please sign up or log in."
      });
    }

    if (result.expiresAt < Date.now()) {
      console.log("Verification link expired");
      await UserVerification.deleteOne({ userId });
      await User.deleteOne({ _id: userId });

      return res.json({
        status: "FAILED",
        message: "Verification link has expired. Please sign up again."
      });
    }

    const isMatch = await bcrypt.compare(uniqueString, result.uniqueString);
    if (!isMatch) {
      console.log("Verification details do not match");
      return res.json({
        status: "FAILED",
        message: "Invalid verification details passed. Check your inbox."
      });
    }

    await User.updateOne({ _id: userId }, { verified: true });
    await UserVerification.deleteOne({ userId });

    console.log("Email verified successfully");
    res.sendFile(path.join(__dirname, '../public/verification.html'));
  } catch (error) {
    console.error("An error occurred during email verification:", error);
    next(new ErrorHandler("An error occurred during email verification", 500));
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role."));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  if (!user.verified) {
    return next(new ErrorHandler("Email not verified. Please check your inbox.", 401));
  }

  if (user.role !== role) {
    return next(new ErrorHandler(`User with provided email and ${role} not found!`, 404));
  }

  sendToken(user, 201, res, "User Logged In!");
});



export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
