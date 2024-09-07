# Wisdom-Peak-Analytics
<h2>Job Application Management System API</h2>
<div>This is a RESTful API built to manage a job application system for a company. It allows management of job positions, applicants' details (such as name, email, resume link, and status), and interview dates. The API is built using Node.js with Express and connected to a MySQL database.</div>

## Deployment:
The backend for this project is deployed on Railway. You can access the live API at:
https://wisdom-peak-analytics-production.up.railway.app/

## Features:
<ul>
  <li>Authentication: Secure API endpoints using JWT (JSON Web Tokens) for user authentication.</li>
  <li>Jobs Management: Create and retrieve job positions.</li>
  <li>Applicants Management: Add, update, delete, and retrieve job applicants.</li>
  <li>Interviews Management: Schedule and fetch interview details for applicants.</li>
  <li>Validation: Input validation for email format, required fields, and valid job IDs.</li>
</ul>

## Requirements:
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MySQL.</li>
  <li>JWT for authentication</li>
</ul>

## Setup Instructions:
<h4>1. Clone the repository:</h4>

git clone https://github.com/Sameeer-Ahmad/Wisdom-Peak-Analytics.git

<h4>2. Navigate to the project directory:</h4>
cd backend

<h4>3. Install dependencies:</h4>
npm install

## Database Connection:
The API connects to the database using Sequelize. The configuration is located in config/db.js. 

## Database Schema:

<h3>User Table</h3>
<table>
        <thead>
            <tr>
                <th>Column</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>username</td>
                <td>STRING</td>
                <td>The username of the user.</td>
            </tr>
            <tr>
                <td>email</td>
                <td>STRING</td>
                <td>The email address of the user.</td>
            </tr>
            <tr>
                <td>password</td>
                <td>STRING</td>
                <td>The password of the user..</td>
            </tr>
        </tbody>
    </table>
    
<h3>Blacklist Table</h3>
    <table>
        <thead>
            <tr>
                <th>Column</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>token</td>
                <td>STRING</td>
                <td>The token that is blacklisted.</td>
            </tr>
        </tbody>
    </table>

    
 <h3>Jobs Table</h3>
    <table>
        <thead>
            <tr>
                <th>Column</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>job_id</td>
                <td>INTEGER</td>
                <td>Primary key</td>
            </tr>
            <tr>
                <td>title</td>
                <td>STRING</td>
                <td>Job title</td>
            </tr>
            <tr>
                <td>department</td>
                <td>STRING</td>
                <td>Department name</td>
            </tr>
            <tr>
                <td>description</td>
                <td>TEXT</td>
                <td>Job description</td>
            </tr>
            <tr>
                <td>open_date</td>
                <td>DATE</td>
                <td>Date when the job was posted</td>
            </tr>
        </tbody>
    </table>
    
<h3>Applicants Table</h3>
    <table>
        <thead>
            <tr>
                <th>Column</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>applicant_id</td>
                <td>INTEGER</td>
                <td>Primary key</td>
            </tr>
            <tr>
                <td>job_id</td>
                <td>INTEGER</td>
                <td>Foreign key from Jobs table</td>
            </tr>
            <tr>
                <td>name</td>
                <td>STRING</td>
                <td>Applicant name</td>
            </tr>
            <tr>
                <td>email</td>
                <td>STRING</td>
                <td>Applicant email</td>
            </tr>
            <tr>
                <td>resume_link</td>
                <td>STRING</td>
                <td>URL link to applicant's resume</td>
            </tr>
            <tr>
                <td>status</td>
                <td>ENUM</td>
                <td>Status (Pending, Interviewed, Rejected, Hired)</td>
            </tr>
        </tbody>
    </table>

   <h3>Interviews Table</h3>
    <table>
        <thead>
            <tr>
                <th>Column</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>interview_id</td>
                <td>INTEGER</td>
                <td>Primary key</td>
            </tr>
            <tr>
                <td>applicant_id</td>
                <td>INTEGER</td>
                <td>Foreign key from Applicants table</td>
            </tr>
            <tr>
                <td>interview_date</td>
                <td>DATE</td>
                <td>Date of the interview</td>
            </tr>
            <tr>
                <td>interviewer_name</td>
                <td>STRING</td>
                <td>Name of the interviewer</td>
            </tr>
        </tbody>
    </table>

## API Endpoints:

<h3>1.POST /users/signup</h3>
singup the user
<li>Body:</li>
 {
 "username": "user",
 "email":"email@gmail.com
 "password": "pass"
 }
 
<h3>2.POST /users/login</h3>
<li>Body:</li>
login the user
 {
 "email": "user@gmail.com", 
 "password": "pass"
 }

<h3>3.POST /users/logout</h3>
logout the user

<h3>4. POST /jobs</h3>
Create a new job position.
<li>Body:</li>
{
  "title": "Software Engineer",
  "department": "Engineering",
  "description": "Develop and maintain web applications.",
  "open_date": "2024-09-01"
}

<h3>5. GET /jobs</h3>
Retrieve a list of all job positions.

<h3>6. POST /applicants</h3>
Add a new applicant for a specific job.
<li>Body:</li>
{
  "job_id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "resume_link": "http://example.com/resume.pdf",
  "status": "Pending"
}

<h3>7. GET /applicants?jobId={jobId}</h3>
Retrieve a list of all applicants for a specific job.

<h3>8. PATCH /applicants/{applicantId}</h3>
Update the status of an applicant.
<li>Body:</li>
{
  "status": "Interviewed"
}

<h3>9. DELETE /applicants/{applicantId}</h3>
Delete an applicant from the database.

<h3>10. POST /interviews</h3>
Schedule an interview.
<li>Body:</li>
{
  "applicant_id": 1,
  "interview_date": "2024-09-15",
  "interviewer_name": "Jane Smith"
}

<h3>11. GET /interviews?applicantId={applicantId}</h3>
Fetch interview details for a specific applicant.



## Postman Collection

You can easily import and test the API endpoints using the Postman collection provided below.
<br>
<br>
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/34319927-5671d02f-7cc8-4eee-aadf-83e31e1f4d59?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D34319927-5671d02f-7cc8-4eee-aadf-83e31e1f4d59%26entityType%3Dcollection%26workspaceId%3D968dce44-77e8-4518-a83b-bec0c092fa2f)








    
