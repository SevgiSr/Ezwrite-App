import Story from "../db/models/Story.js";
import { StatusCodes } from "http-status-codes";

const getByCategory = async (req, res) => {
  const { category } = req.params;
  const stories = await Story.find({ category }).populate("author");

  res.status(StatusCodes.OK).json({ stories });
};

export { getByCategory };
