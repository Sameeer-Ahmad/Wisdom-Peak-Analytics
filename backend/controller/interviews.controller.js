const Applicant = require("../model/applicant.model");
const Interview = require("../model/interview.model");

// Schedule an interview
const ScheduleInterview = async (req, res) => {
  const { applicant_id, interview_date, interviewer_name } = req.body;
  if (!applicant_id || !interview_date || !interviewer_name) {
    return res.status(400).send({ msg: "Please provide all required fields" });
  }
  try {
    const applicant = await Applicant.findByPk(applicant_id);
    if (!applicant) {
      return res.status(404).send({ msg: "Applicant not found" });
    }
    const newInterview = await Interview.create({
      applicant_id,
      interview_date,
      interviewer_name,
    });
    return res
      .status(201)
      .send({ msg: "Interview scheduled successfully", newInterview });

  } catch (error) {
    console.log(error);
    res
      .statsu(500)
      .send({
        msg: "An error occurred while scheduling interview",
        error: error.message,
      });
  }
};

// get interview by applicant id
const getInterviewByAllicantID = async (req, res) => {
  const { applicantId } = req.query;
  console.log("fe", applicantId);

  if (!applicantId) {
    return res.status(400).send({ msg: "Please provide applicantId" });
  }
  try {
    const interviews = await Interview.findAll({
      where: { applicant_id: applicantId },
    });
    console.log("fe", interviews);

    return res.status(200).send(interviews);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({
        msg: "An error occurred while retrieving interviews",
        error: error.message,
      });
  }
};

module.exports = { getInterviewByAllicantID, ScheduleInterview };
