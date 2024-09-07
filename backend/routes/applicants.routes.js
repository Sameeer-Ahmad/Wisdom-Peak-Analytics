const express = require("express");
const {
  addApplicant,
  updateApplicantStatus,
  getApplicantsByJobId,
  deleteApplicant,
} = require("../controller/applicants.controller");

const applicantRouter = express.Router();

applicantRouter.post("/applicants", addApplicant);
applicantRouter.get("/applicants", getApplicantsByJobId);
applicantRouter.patch("/applicants/:applicantId", updateApplicantStatus);
applicantRouter.delete("/applicants/:applicantId", deleteApplicant);


module.exports = {
  applicantRouter,
};
