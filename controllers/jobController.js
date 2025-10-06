import { JobModel } from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {
  try {
    const page = +req.params.page;
    const pageSize = +req.params.pageSize;
    let skip = (page - 1) * pageSize;

    let filter = { isActive: true };

    const getAllJobs = await JobModel.find(filter, { createdBy: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);
    const jobsCount = await JobModel.countDocuments(filter);
    const totalPages = Math.ceil(jobsCount / pageSize);

    let responseObject = {
      success: true,
      totalRecords: jobsCount,
      message: "Jobs fetched successfully",
      data: getAllJobs,
      totalPages: totalPages,
    };
    res.status(200).json(responseObject);
  } catch (error) {
    dbLogger.error("Error in getAllJobs: ", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const addJob = async (req, res) => {
  try {
    const data = req.body;
    const newJob = new JobModel(data);
    await newJob.save();
    res
      .status(201)
      .json({ success: true, message: "Job added successfully", data: newJob });
  } catch (error) {
    dbLogger.error("Error in addJob: ", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
