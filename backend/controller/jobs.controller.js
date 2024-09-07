const Job = require("../model/job.model");

// Add Jobs
const addJobs = async (req, res) => {
  const { title, department, description, open_date } = req.body;

  if (!title || !department || !description || !open_date) {
    return res
      .status(400)
      .json({ msg: "Please provide title, department, and open date" });
  }

  try {
    const newJob = await Job.create({
      title,
      department,
      description,
      open_date,
    });
    return res
      .status(201)
      .send({ msg: "Job position created successfully", job: newJob });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Unable to add job position", error: error.message });
  }
};

// Get Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    return res.status(200).send({ jobs });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Unable to retrieve jobs", error: error.message });
  }
};

module.exports = {
  addJobs,
  getJobs,
};
