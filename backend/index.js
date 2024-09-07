const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const { ConnectToDB } = require("./config/db");
const { authRouter } = require("./routes/user.routes");
const { jobRouter } = require("./routes/jobs.routes");
const authMiddleware = require("./middleware/auth.middleware");
const { applicantRouter } = require("./routes/applicants.routes");
const { interviewRouter } = require("./routes/interviews.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users",authRouter)
app.use(authMiddleware,jobRouter)
app.use(authMiddleware,applicantRouter)
app.use(authMiddleware,interviewRouter)

app.get("/", (req, res) => {
  res.send("Welcome to the job application management system");
});

app.listen(PORT, async () => {
  try {
    await ConnectToDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});


/**
 * Role Access to Endpoints:
POST /jobs: Add a new job position.
GET /jobs: Retrieve a list of all job positions.
POST /applicants: Add a new applicant for a specific job.
GET /applicants?jobId={jobId}: Retrieve a list of all applicants for a specific job.
PATCH /applicants/{applicantId}: Update the status of an applicant.
DELETE /applicants/{applicantId}: Delete an applicant from the database.
POST /interviews: Schedule an interview.
GET /interviews?applicantId={applicantId}: Fetch interview details for a specific applicant.
 */

/**
 * Jobs Controller and Routes:

Controller Name: jobsController.js
Router File: jobsRouter.js
Route Prefix: /jobs
Example Route:
POST /jobs: Adds a new job position
GET /jobs: Retrieves all job positions
Applicants Controller and Routes:

Controller Name: applicantsController.js
Router File: applicantsRouter.js
Route Prefix: /applicants
Example Route:
POST /applicants: Adds a new applicant for a specific job
GET /applicants?jobId={jobId}: Retrieves all applicants for a specific job
PATCH /applicants/{applicantId}: Updates an applicant's status
DELETE /applicants/{applicantId}: Deletes an applicant
Interviews Controller and Routes:

Controller Name: interviewsController.js
Router File: interviewsRouter.js
Route Prefix: /interviews
Example Route:
POST /interviews: Schedule an interview for an applicant
GET /interviews?applicantId={applicantId}: Fetch interview details for a specific applicant
 * 
 */