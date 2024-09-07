const validator = require("validator");
const Job = require("../model/job.model");
const Applicant = require("../model/applicant.model");

// Add Applicant
const addApplicant = async (req, res) => {
  const { job_id, name, email, resume_link, status } = req.body;
  if (!job_id || !name || !email || !resume_link || !status) {
    return res.status(400).send({ msg: "Please provide all required fields" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send({ msg: "Invalid email format" });
  }

  try {
    const job = await Job.findByPk(job_id);
    if (!job) {
      return res.status(404).send({ msg: "Job not found" });
    }
    const newApplicant = await Applicant.create({
      job_id,
      name,
      email,
      resume_link,
      status,
    });
    return res
      .status(201)
      .send({ msg: "Applicant added successfully", newApplicant });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Unable to add applicant", error: error.message });
  }
};

// Get Applicants
const getApplicantsByJobId = async (req, res) => {
  const { jobId } = req.query;

  if (!jobId) {
    return res.status(400).send({ msg: "JobId query parameter is required" });
  }

  try {
    const applicants = await Applicant.findAll({
      where: { job_id: jobId },
    });
    return res.status(200).send(applicants);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving applicants" });
  }
};

// Update applicant status
const updateApplicantStatus = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Interviewed", "Rejected", "Hired"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const [update] = await Applicant.update(
      { status },
      { where: { applicant_id: applicantId } }
    );
    if (update == 0) {
      return res.status(404).send({ msg: "Applicant not found" });
    }
    return res
      .status(200)
      .send({ msg: "Applicant status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Delete applicant
const deleteApplicant = async (req, res) => {
  const { applicantId } = req.params;
  if (!applicantId) {
    return res.status(400).send({ msg: "Applicant ID is required" });
  }
  try {
    const deletedCount = await Applicant.destroy({
      where: { applicant_id: applicantId },
    });

    if (deletedCount === 0) {
      return res.status(404).send({ msg: "Applicant not found" });
    }

    return res.status(200).send({ msg: "Applicant deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ msg: "Unable to delete applicant", error: error.message });
  }
};

module.exports = {
  addApplicant,
  updateApplicantStatus,
  getApplicantsByJobId,
  deleteApplicant,
};
