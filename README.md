# Job Application Portal

A Node.js + Express + MongoDB backend project for managing job postings, applications, and user authentication.

---

## 🚀 Setup Instructions

### Step 1: Clone repository

```bash
git clone https://github.com/kishan8693/job_application_portal.git
cd job_application_portal

Step 2: Install dependencies
npm install

Step 3: Setup environment

Create a .env file in the root folder
Copy values from the sample below

PORT=5000
MONGO_URI=mongodb+srv://thakor77755:UHVpWXH9RO7ejHqg@cluster0.5jquedw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret
```

Step 4: Run the server
npm run dev

API Endpoints

POST http://localhost:5000/api/auth/register → Register a new user

POST http://localhost:5000/api/auth/login → Login user

POST http://localhost:5000/api/resume/upload → Upload resume
POST http://localhost:5000/api/jobs/apply/:jobId → Apply for a job

GET http://localhost:5000/api/applications → Track user applications
