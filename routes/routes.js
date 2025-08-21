import express from "express";
import userRoutes from '../routes/route/userRoutes.js'
import uploadResumeRoute from "../routes/route/uploadResumeRoute.js"
import applyJobRoute from "../routes/route/applyJobRoute.js"
import applicationsRoute from "../routes/route/applicationsRoute.js"
const router = express.Router()

router.use('/auth', userRoutes)
router.use('/resume', uploadResumeRoute)
router.use('/jobs', applyJobRoute)
router.use('/applications', applicationsRoute)
export default router