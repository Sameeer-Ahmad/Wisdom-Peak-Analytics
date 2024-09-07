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

app.get("/", (req, res) => {
  res.send("Welcome to the job application management system");
});

app.use("/users",authRouter)
app.use(authMiddleware,jobRouter)
app.use(authMiddleware,applicantRouter)
app.use(authMiddleware,interviewRouter)



app.listen(PORT, async () => {
  try {
    await ConnectToDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

