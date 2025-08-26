import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/conn.js'
import router from './routes/routes.js'
dotenv.config({ quiet: true })
connectDb()

const app = express()
app.use(express.json());
app.use('/', router)
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server Running On:- ${port}`)
})