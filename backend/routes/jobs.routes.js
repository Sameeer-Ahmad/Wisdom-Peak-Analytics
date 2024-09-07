const express=require('express');
const { addJobs, getJobs } = require('../controller/jobs.controller');

const jobRouter=express.Router();

jobRouter.post("/jobs",addJobs)
jobRouter.get("/jobs",getJobs)

module.exports={
    jobRouter
}