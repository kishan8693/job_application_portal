import express from 'express'
import { applyJob } from '../../controller/candidateConttoller.js'
import { authorization } from '../../helper/authorization.js'
const router = express.Router()

router.post('/apply/:jobId', authorization, applyJob)
export default router