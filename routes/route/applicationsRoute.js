import express from 'express'
import { getApplications } from '../../controller/candidateConttoller.js'
import { authorization } from '../../helper/authorization.js'
const router = express.Router()

router.get('', authorization, getApplications)
export default router