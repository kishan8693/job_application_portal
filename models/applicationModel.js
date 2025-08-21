import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        resume: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Application = mongoose.model("application", applicationSchema);
export default Application;
