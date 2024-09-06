const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const { ConnectToDB } = require("./config/db");
const { authRouter } = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the job application management system");
});


app.use("/users",authRouter)

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