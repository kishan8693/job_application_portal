import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
