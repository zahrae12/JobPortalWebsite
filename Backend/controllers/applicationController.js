import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../Models/applicationSchema.js";
import { Job } from '../Models/jobSchema.js';
import cloudinary from "cloudinary";

// Post Application
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Company") {
    return next(new ErrorHandler("Company not allowed to access this resource.", 400));
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload a valid file.", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }

  const { name, email, coverLetter, phone, address, jobId, gender, dateOfBirth } = req.body;
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const studentID = { user: req.user._id, role: "Student" };
  const companyID = { user: jobDetails.postedBy, role: "Company" };

  if (!name || !email || !coverLetter || !phone || !address || !resume || !dateOfBirth || !gender) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    studentID,
    companyID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    dateOfBirth,
    gender,
    jobId,
    jobTitle: jobDetails.title,
    company: jobDetails.company,
    companyLogo: jobDetails.companyLogo,
  });

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

// Company get all applications
export const companyGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(new ErrorHandler("Student not allowed to access this resource.", 400));
  }

  const { _id } = req.user;
  const applications = await Application.find({ "companyID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

// Student get all applications
export const studentGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Company") {
    return next(new ErrorHandler("Company not allowed to access this resource.", 400));
  }

  const { _id } = req.user;
  const applications = await Application.find({ "studentID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

// Student delete application
export const studentDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Company") {
    return next(new ErrorHandler("Companies not allowed to access this resource.", 400));
  }

  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  await application.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application Deleted!",
  });
});


export const setInterviewDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { interviewDetails } = req.body;

  // Check if either location or meeting link is provided
  if (!interviewDetails || (!interviewDetails.location && !interviewDetails.meetingLink)) {
    return next(new ErrorHandler('Either location or meeting link is required for interview details!', 400));
  }

  const application = await Application.findByIdAndUpdate(
    id,
    { interviewDetails },
    { new: true }
  );

  if (!application) {
    return next(new ErrorHandler('Application not found!', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Interview details set successfully!',
    application,
  });
});


// Submit Company Feedback
// Submit Company Feedback
export const submitCompanyFeedback = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { companyFeedback, interviewDetails } = req.body;

  if (!["interview", "reject", "accept"].includes(companyFeedback)) {
    return next(new ErrorHandler("Invalid company feedback value!", 400));
  }

  const updateData = { companyFeedback };
  if (companyFeedback === "interview") {
    const { time, location, meetingLink } = interviewDetails;
    if (!time || !(location || meetingLink) || (location && meetingLink)) {
      return next(new ErrorHandler("Invalid interview details!", 400));
    }
    updateData.interviewDetails = interviewDetails;
  } else {
    updateData.interviewDetails = null; // Clear interview details if feedback is not interview
  }

  const application = await Application.findByIdAndUpdate(id, updateData, { new: true });

  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Company feedback submitted successfully!",
    application,
  });
});


// Get feedback for student
// Get feedback for student
export const getFeedbackForStudent = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const application = await Application.findById(id);

  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  const { companyFeedback } = application;
  
  // Determine if confirmation is required based on company feedback
  const requireConfirmation = companyFeedback === "interview";

  res.status(200).json({
    success: true,
    companyFeedback,
    requireConfirmation,
  });
});



// Get applications with interviews for the company
export const getApplicationsWithInterviews = catchAsyncErrors(async (req, res, next) => {
  const applications = await Application.find({ companyFeedback: 'interview' });

  res.status(200).json({
    success: true,
    applications
  });
});


