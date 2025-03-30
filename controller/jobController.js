import Job from '../models/jobModel.js'
import mongoose from 'mongoose';
import day from 'dayjs';
export const getAllJobs = async (req, res) => {
    const jobs=await Job.find({createdBy:req.user.userId});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy=req.user.userId;
  const job=await Job.create(req.body)
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

export const showStats=async(req,res)=>{
  let stats = await Job.aggregate([
    //$match is used to find the users job based on user id
    //group is used to group them based on their job status
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
let monthlyApplications = await Job.aggregate([
  { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
  {
    $group: {
      _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
      count: { $sum: 1 },
    },
  },
  { $sort: { "_id.year": -1, "_id.month": -1 } },
  { $limit: 6 },
]);
monthlyApplications = monthlyApplications
  .map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;

    const date = day()
      .month(month - 1)
      .year(year)
      .format("MMM YY");
    return { date, count };
  })
  .reverse();
  res.status(200).json({ defaultStats, monthlyApplications });
};

