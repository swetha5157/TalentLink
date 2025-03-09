import Job from '../models/jobModel.js'
export const getAllJobs = async (req, res) => {
  console.log(req.user);
    const jobs=await Job.find({});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job=await Job.create({company,position})
  res.status(201).json({msg:'created new job', job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(200).json({ job});
};

export const editJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true, //this line makes to send the new updated in the updatedJob variable else the old value is stored in updatedJob variable
    runValidators: true,
  });
  return res.status(201).json({msg:'job mofified',job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removeJob = await Job.findByIdAndDelete(id);
  return res.status(200).json({ msg: `job with id ${id} is deleted.`,job:removeJob });
};