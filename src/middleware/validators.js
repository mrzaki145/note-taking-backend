import { body, param, query } from "express-validator";

export const createNoteValidators = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title must be less than 255 characters"),
  body("content").optional().isString().withMessage("Content must be a string"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags) => tags.every((tag) => typeof tag === "string"))
    .withMessage("All tags must be strings"),
];

export const updateNoteValidators = [
  param("id").isUUID().withMessage("Invalid note ID"),
  body("title")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Title must be less than 255 characters"),
  body("content").optional().isString().withMessage("Content must be a string"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags) => tags.every((tag) => typeof tag === "string"))
    .withMessage("All tags must be strings"),
  body("is_archived")
    .optional()
    .isBoolean()
    .withMessage("is_archived must be a boolean"),
];

export const toggleArchiveValidators = [
  param("id").isUUID().withMessage("Invalid note ID"),
];

export const getNotesValidators = [
  query("archived")
    .optional()
    .isBoolean()
    .withMessage("archived must be a boolean"),
  query("tag").optional().isString().withMessage("tag must be a string"),
  query("search").optional().isString().withMessage("search must be a string"),
];
