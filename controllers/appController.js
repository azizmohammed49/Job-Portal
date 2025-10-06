import ApplicationModel from "../models/ApplicationModel.js";
import { dbLogger } from "../utils/logger.js";

export const applyForJob = async (req, res) => {
  try {
    req.body.resume = req.file ? req.file.filename : null;
    let data = req.body;
    data.jobId = req.params.jobId;
    // data.resume = req.body.resume;
    data.appliedAt = new Date();
    const newApplication = new ApplicationModel(data);
    await newApplication.save();
    res.status(201).json({
      success: true,
      message: "Applied successfully",
      data: newApplication,
    });
  } catch (error) {
    dbLogger.error("Error in applyForJob: ", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const appliedCandidates = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const applications = await ApplicationModel.find({ jobId }).populate(
      "userId",
      "-password -role -isActive -isEmailVerified -createdAt -updatedAt -__v"
    );
    res.status(200).json({
      success: true,
      message: "Fetched All Applications",
      data: applications,
    });
  } catch (error) {
    dbLogger.error("Error in appliedCandidates: ", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
