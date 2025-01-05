import * as tagService from "../services/tagService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getTags = asyncHandler(async (req, res) => {
  const tags = await tagService.getUserTags(req.user.id);
  res.json(tags);
});
