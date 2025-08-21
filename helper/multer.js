import path, { basename } from "path"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (res, file, cb) {
        const ext = path.extname(file.originalname)
        const baseName = path.basename(file.originalname, ext);
        cb(null, Date.now() + "-" + baseName + ext);
    }
})

export const uploadCv = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed."));

        }
    }
}).single("resume")