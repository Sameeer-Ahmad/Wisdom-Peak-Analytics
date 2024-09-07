const { getInterviewByAllicantID, ScheduleInterview } = require("../controller/interviews.controller");

const express=require("express");

const interviewRouter=express.Router();

interviewRouter.post("/interviews",ScheduleInterview)
interviewRouter.get("/interviews",getInterviewByAllicantID)

module.exports={
    interviewRouter
}