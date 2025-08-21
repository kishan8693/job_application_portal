import mongoose from "mongoose";
import { uploadCv } from "../helper/multer.js";
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { findUserService } from "../service/userService.js";
import { createApplicationService, findApplicationService } from "../service/applicationService.js";

export const uploadResume = async (req, res) => {
    uploadCv(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    success: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "File size should not exceed 2 MB",
                });
            }
            return res.status(400).json({
                success: false,
                statusCode: StatusCodes.BAD_REQUEST,
                message: err.message || "File upload error",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                statusCode: StatusCodes.BAD_REQUEST,
                message: "No file uploaded",
            });
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { resume: `/uploads/${req.file.filename}` }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            statuscode: StatusCodes.OK,
            message: "Resume uploaded successfully",
            filePath: `/uploads/${req.file.filename}`,
        });
    });
}

export const applyJob = async (req, res) => {
    try {
        const { jobId } = req.params
        console.log("jobId", jobId)

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                success: false,
                statuscode: StatusCodes.BAD_REQUEST,
                message: "Invalid job ID format"
            });
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                success: false,
                statuscode: StatusCodes.NOT_FOUND,
                message: "Job not found"
            });
        }
        const user = await findUserService(req.user._id)
        if (!user || !user.resume) {
            return res.status(400).json({
                success: false,
                statuscode: StatusCodes.BAD_REQUEST,
                message: "please upload your resume first"
            })
        }
        const existingApplication = await findApplicationService({
            user: req.user._id,
            job: jobId
        });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                statuscode: StatusCodes.BAD_REQUEST,
                message: "you have already applied for this job"
            })
        }
        const newApplication = await createApplicationService({
            user: req.user._id,
            job: jobId,
            resume: user.resume
        });
        return res.status(201).json({
            success: true,
            statuscode: StatusCodes.CREATED,
            message: "Applied Successfully!!!",
            applicationId: newApplication._id

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Failed to apply for job",
            error: error.message
        });
    }
}

export const getApplications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const applications = await Application.find({ user: req.user._id })
            .populate("job", "title description location")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        if (!applications.length) {
            return res.status(404).json({
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: "No applications found"
            });
        }
        const totalApplications = await Application.countDocuments({ user: req.user._id })

        res.status(200).json({
            success: true,
            statusCode: StatusCodes.OK,
            message: "Applications fetched successfully!",
            applications,
            pagination: {
                currentPage: page,
                totalPage: Math.ceil(totalApplications / limit),
                totalApplications: totalApplications,
                limit: limit
            },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Failed to fetch applications",
            error: error.message
        });
    }
}