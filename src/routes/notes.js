import express from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  toggleArchive,
  updateNote,
} from "../controllers/noteController.js";
import { getTags } from "../controllers/tagController.js";
import {
  createNoteValidators,
  getNotesValidators,
  toggleArchiveValidators,
  updateNoteValidators,
} from "../middleware/validators.js";

const router = express.Router();

// Create a note
router.post("/", createNoteValidators, createNote);

// Get all notes (with optional filters)
router.get("/", getNotesValidators, getNotes);

// Get all unique tags
router.get("/tags", getTags);

// Get a specific note
router.get("/:id", getNoteById);

// Update a note
router.put("/:id", updateNoteValidators, updateNote);

// Toggle archive status
router.patch("/:id/archive", toggleArchiveValidators, toggleArchive);

// Delete a note
router.delete("/:id", deleteNote);

export { router as notesRouter };
