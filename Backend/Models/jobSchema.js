import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please provide a title."],
      minLength: [3, "Title must contain at least 3 Characters!"],
      maxLength: [30, "Title cannot exceed 30 Characters!"],
    },
    description: {
      type: String,
      required: [true, "Please provide decription."],
      minLength: [15, "Description must contain at least 15 Characters!"],
      maxLength: [500, "Description cannot exceed 500 Characters!"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category."],
    },
    country: {
      type: String,
      required: [true, "Please provide a country name."],
    },
    city: {
      type: String,
      required: [true, "Please provide a city name."],
    },
    company: {
      type: String,
      required: [true, "Please provide a company name."],
    },
    companyLogo: {
      type: String ,
      required: true
     
    },
    location: {
      type: String,
      required: [true, "Please provide location."],
      minLength: [20, "Location must contian at least 20 characters!"],
    },
    fixedSalary: {
      type: Number,
      minLength: [4, "Salary must contain at least 4 digits"],
      maxLength: [9, "Salary cannot exceed 9 digits"],
    },
    salaryFrom: {
      type: Number,
      minLength: [4, "Salary must contain at least 4 digits"],
      maxLength: [9, "Salary cannot exceed 9 digits"],
    },
    salaryTo: {
      type: Number,
      minLength: [4, "Salary must contain at least 4 digits"],
      maxLength: [9, "Salary cannot exceed 9 digits"],
    },
    requirements:{
        type:Array,
        required:[true,"requirements job are required!"],
        
    },
    jobResponsibility:{
      type:String,
      required:[true,"job responsibilities are required!"],
    },
    experiences :{
           type: String,
    },
    expired: {
      type: Boolean,
      default: false,
    },
    jobPostedOn: {
      type: Date,
     
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  export const Job = mongoose.model("Job", jobSchema);