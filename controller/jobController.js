import Job from '../models/jobModel.js'
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position)
    return res.status(400).json({ message: "No company or position" });

  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with the id ${id}` });
  }
  res.status(200).json({ job });
};

export const editJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position)
    return res.status(400).json({ msg: "provide comapny and position" });
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with the id ${id}` });
  }
  if (company) job.company = company;
  if (position) job.position = position;
  return res.status(201).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with the id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  return res.status(200).json({ msg: `job with id ${id} is deleted.` });
};