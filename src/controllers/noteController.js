import { validationResult } from "express-validator";
import * as noteService from "../services/noteService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createNote = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const note = await noteService.createNoteForUser(req.user.id, req.body);
  res.status(201).json(note);
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await noteService.getNotesForUser(req.user.id, req.query);
  res.json(notes);
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await noteService.getNoteById(req.params.id, req.user.id);
  res.json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const note = await noteService.updateNote(
    req.params.id,
    req.user.id,
    req.body
  );
  res.json(note);
});

export const toggleArchive = asyncHandler(async (req, res) => {
  const note = await noteService.toggleArchiveStatus(
    req.params.id,
    req.user.id
  );
  res.json(note);
});

export const deleteNote = asyncHandler(async (req, res) => {
  await noteService.deleteNote(req.params.id, req.user.id);
  res.status(204).send();
});
