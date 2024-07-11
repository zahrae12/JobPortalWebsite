import express from "express"
import{deleteJob, getAllJobs,getMyJobs,getSingleJob,postJob, updateJob} from '../controllers/jobController.js'
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/getall",getAllJobs);
router.post("/postjob",isAuthorized,postJob);
router.get("/myjobs",isAuthorized,getMyJobs);
router.put("/update/:id",isAuthorized,updateJob);
router.delete("/delete/:id",isAuthorized,deleteJob);
router.get("/:id", isAuthorized, getSingleJob);
export default router;