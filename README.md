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

PORT=4000
MONGO_URI=mongodb+srv://thakor77755:UHVpWXH9RO7ejHqg@cluster0.5jquedw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret
```

Step 4: Run the server
npm run dev

Authentication & Job Application APIs

### 1. Register User

**Endpoint:**  
API:- https://job-application-portal-7kuz.onrender.com/auth/register
METHOD:POST
**Request Body:**

````json
{
  "name": "Kishan",
  "email": "kishan@example.com",
  "password": "Pass@123",
  "role": "applicant"
}


Success Response (201):
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully"
}

Error Response (409 - Email Exists):
{
  "success": false,
  "statusCode": 409,
  "message": "User already exists"
}

Error Response (500 - Server Error):
{
  "success": false,
  "statusCode": 500,
  "message": "Registration failed, please try again later"
}

2. Login User
API:- https://job-application-portal-7kuz.onrender.com/auth/login
METHOD:POST
Request Body:
{
  "email": "kishan@example.com",
  "password": "Pass@123"
}

Success Response:(200)
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}

Error Response (404 Not Found – user not exists):
{
  "success": false,
  "statusCode": 404,
  "message": "Account not found"
}

Error Response (401 Unauthorized – wrong password):
{
  "success": false,
  "statusCode": 401,
  "message": "Invalid email or password"
}

Error Response (500 Server Error):
{
  "success": false,
  "statusCode": 500,
  "message": "Login failed, please try again later"
}



### 3. Upload Resume
API:- https://job-application-portal-7kuz.onrender.com/resume/upload
METHOD:POST
**Headers:**
Authorization: Bearer <your_jwt_token>

**Request Body (form-data):**
key:file
value:you have to upload resume
type:file
---

**Success Response (200):**
```json
{
  "success": true,
  "statuscode": 200,
  "message": "Resume uploaded successfully",
  "filePath": "/uploads/1756212642987-Resume_node_latest_kishan.pdf"
}

Error Response (400 - No file uploaded):
{
  "success": false,
  "statusCode": 400,
  "message": "No file uploaded"
}

Error Response (400 - File too large):
{
  "success": false,
  "statusCode": 400,
  "message": "File size should not exceed 2 MB"
}

Error Response (404 - User not found):
{
  "success": false,
  "statusCode": 404,
  "message": "User not found"
}


### 4. Apply for a Job
API:- https://job-application-portal-7kuz.onrender.com/jobs/apply/68adad837107449206afc7b4
METHOD:POST
**Headers:**
Authorization: Bearer <your_jwt_token>

*Request Params:**
- `jobId` → The **MongoDB ObjectId** of the job you want to apply for.

**Request Body:**
(No body needed, only token + jobId in params)


**Success Response (201):**
```json
{
  "success": true,
  "statuscode": 201,
  "message": "Applied Successfully!!!",
  "applicationId": "66c64d78c27228fef3da70bb"
}

Error Response (400 - Invalid JobId):
{
  "success": false,
  "statuscode": 400,
  "message": "Invalid job ID format"
}
Error Response(404- if job not found)

{
  "success": false,
  "statuscode": 404,
  "message": "Job not found"
}
Error Response (400 - Resume missing):
{
  "success": false,
  "statuscode": 400,
  "message": "please upload your resume first"
}
Error Response (400 - Already applied):
{
  "success": false,
  "statuscode": 400,
  "message": "you have already applied for this job"
}
Error Response (500 - Server error):
{
  "success": false,
  "statuscode": 500,
  "message": "Failed to apply for job",
  "error": "Some error message"
}

### 5. Get My Job Applications
API:- https://job-application-portal-7kuz.onrender.com/applications
METHOD:GET
**Headers:**
Authorization: Bearer <your_jwt_token>


**Query Params (optional):**
- `page` → Page number (default: 1)
- `limit` → Number of applications per page (default: 10)

---

**Success Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Applications fetched successfully!",
  "applications": [
    {
      "_id": "66c659edc27228fef3da70a9",
      "job": {
        "_id": "66c64d78c27228fef3da70bb",
        "title": "Frontend Developer",
        "description": "Build UI with React.js",
        "location": "Remote"
      },
      "user": "66c642d4c27228fef3da7098",
      "resume": "/uploads/cv_kishan.pdf",
      "createdAt": "2025-08-25T11:23:45.678Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPage": 3,
    "totalApplications": 25,
    "limit": 10
  }
}

Error Response (404 - No applications found):
{
  "success": false,
  "statusCode": 404,
  "message": "No applications found"
}

Error Response (500 - Server error):
{
  "success": false,
  "statuscode": 500,
  "message": "Failed to fetch applications",
  "error": "Some error message"
}

````
