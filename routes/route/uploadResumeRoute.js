import express from 'express'
import { uploadResume } from '../../controller/candidateConttoller.js'
import { authorization } from '../../helper/authorization.js'

const router = express.Router()

router.post('/upload', authorization, uploadResume)

export default router