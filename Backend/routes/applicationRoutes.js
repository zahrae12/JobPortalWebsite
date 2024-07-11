import express from "express"
import { companyGetAllApplications, postApplication, studentDeleteApplication, studentGetAllApplications,submitCompanyFeedback,getFeedbackForStudent, getApplicationsWithInterviews } from '../controllers/applicationController.js'
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.post("/post", isAuthorized, postApplication);
router.get("/student/getall",isAuthorized,studentGetAllApplications);
router.get("/company/getall",isAuthorized,companyGetAllApplications);
router.delete("/delete/:id",isAuthorized,studentDeleteApplication);
router.post("/submit-feedback/:id", isAuthorized, submitCompanyFeedback);
router.get("/feedback/:id", isAuthorized, getFeedbackForStudent);
router.get("/company/getinterviews",isAuthorized,getApplicationsWithInterviews);

export default router; 