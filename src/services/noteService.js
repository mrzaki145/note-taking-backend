import { supabase } from "../config/supabase.js";
import { AppError, ForbiddenError, NotFoundError } from "../utils/errors.js";
import { sanitizeContent } from "../utils/sanitizer.js";

export async function createNoteForUser(userId, { title, content, tags = [] }) {
  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        title,
        content: sanitizeContent(content || ""),
        tags,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw new AppError(error.message, 400);
  return data;
}

export async function getNotesForUser(userId, { archived, tag, search }) {
  let query = supabase.from("notes").select("*").eq("user_id", userId);

  if (archived !== undefined) {
    query = query.eq("is_archived", archived === "true");
  }

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw new AppError(error.message, 400);
  return data;
}

export async function getNoteById(noteId, userId) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single();

  if (error) throw new NotFoundError("Note not found");
  if (data.user_id !== userId) throw new ForbiddenError("Access denied");

  return data;
}

export async function updateNote(noteId, userId, updates) {
  // First verify ownership
  await getNoteById(noteId, userId);

  const { data, error } = await supabase
    .from("notes")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", noteId)
    .eq("user_id", userId) // Double-check ownership
    .select()
    .single();

  if (error) throw new AppError(error.message, 400);
  return data;
}

export async function toggleArchiveStatus(noteId, userId) {
  const note = await getNoteById(noteId, userId);

  const { data, error } = await supabase
    .from("notes")
    .update({
      is_archived: !note.is_archived,
      updated_at: new Date().toISOString(),
    })
    .eq("id", noteId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw new AppError(error.message, 400);
  return data;
}

export async function deleteNote(noteId, userId) {
  // First verify ownership
  await getNoteById(noteId, userId);

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .eq("user_id", userId); // Double-check ownership

  if (error) throw new AppError(error.message, 400);
}
