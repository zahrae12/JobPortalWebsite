import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job} from "../Models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";



export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { query, location, salary, category } = req.query;
  let jobs;

  let filter = { expired: false };

  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } }
    ];
  }
  if (location) {
    filter.$or = [
      ...(filter.$or || []),
      { location: { $regex: location, $options: 'i' } },
      { city: { $regex: location, $options: 'i' } }
    ];
  }
  if (salary) {
    filter.$or = [
      ...(filter.$or || []),
      {
        $or: [
          { fixedSalary: { $exists: true, $eq: salary } },
          { salaryFrom: { $exists: true, $lte: salary } },
          { salaryTo: { $exists: true, $gte: salary } }
        ]
      }
    ];
  }
  if (category) {
    filter.category = category; // Assuming category is a direct field in the Job model
  }

  jobs = await Job.find(filter);

     
  res.status(200).json({
    success: true,
    jobs,
  });
});

  export const postJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Student") {
      return next(
        new ErrorHandler("students not allowed to access this resource.", 400)
      );
    }
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      requirements,
      company,
      jobResponsibility,
     
      companyLogo,
      jobPostedOn,
      
    } = req.body;
  
    const requiredFields = ['title', 'description', 'category', 'country', 'city', 'location', 'requirements','company','companyLogo'];
    const missingField = requiredFields.find(field => !req.body[field]);

    if (missingField) {
        return next(new ErrorHandler(`Please provide ${missingField}.`, 400));
    }
    if ((salaryFrom && salaryTo) && fixedSalary) {
  return next(new ErrorHandler("Please provide either fixed salary or ranged salary, not both.", 400));
}

    // Check if both ranged salary fields or fixed salary field are provided
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Please either provide fixed salary or ranged salary.", 400));
    }
  
   // Check if both ranged salary fields or fixed salary field are provided
 
    const postedBy = req.user._id;
    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      requirements,
      postedBy,
      company,
      companyLogo,
      jobPostedOn,
      postedBy,
      jobResponsibility,
      
    });
    res.status(200).json({
      success: true,
      message: "Job Posted Successfully!",
      job,
    });
  });

 
  export const getMyJobs = catchAsyncErrors(async(req,res,next)=>{
    const {role}= req.user;
    if (role === "Student") {
      return next(
        new ErrorHandler("students not allowed to access this resource.", 400)
      );
    }
    const myjobs = await Job.find({postedBy:req.user._id});
    res.status(200).json({
      sucess:true,
      myjobs,
    })
  })
  export const updateJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Student") {
      return next(
        new ErrorHandler("student not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("OOPS! Job not found.", 404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Job Updated!",
    });
  });

  export const deleteJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Student") {
      return next(
        new ErrorHandler("students not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("OOPS! Job not found.", 404));
    }
    await job.deleteOne();
    res.status(200).json({
      success: true,
      message: "Job Deleted!",
    });
  });

  export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  }) 