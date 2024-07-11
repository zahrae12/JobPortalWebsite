import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  dateOfBirth:{
    type:Date,
  },
  gender:{
    type:String,
    required:true,
  },
 
  coverLetter: {
    type: String,
    required: [true, "Please provide a cover letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  resume: {
    public_id: {
      type: String, 
      required: true,
    },
    url: {
      type: String, 
      required: true,
    },
  },
  studentID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Student"],
      required: true,
    },
  },
  companyID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Company"],
      required: true,
    },
  },
  companyFeedback: {
    type: String,
    enum: ["interview", "reject", "accept"],
    default: null, // Initially, there might be no feedback
  },
  interviewDetails: {
    time: { type: Date },
    location: { type: String },
    meetingLink: { type: String }
  },
  companyLogo:{
    type:String,
  },
  requireConfirmation: {
    type: Boolean,
    default: false
  },
  
  dateOfApplication: {
    type: Date,
    default: Date.now,
},
   jobTitle: {
  type: String,
  required: true,
},
  company: {
  type: String,
  required: true,
},
});

export const Application = mongoose.model("Application", applicationSchema);