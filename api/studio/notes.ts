import { getSupabaseAdmin, type StudioNote } from '../_lib/supabase';
import { isAuthenticated } from '../_lib/session';
import { methodNotAllowed, readRequestBody, type ApiRequest, type JsonResponse } from '../_lib/http';

export default async function handler(request: ApiRequest, response: JsonResponse) {
  if (!isAuthenticated(request)) {
    response.status(401).json({ error: 'Oturum gerekli' });
    return;
  }

  if (request.method === 'GET') {
    await listNotes(response);
    return;
  }

  if (request.method === 'POST') {
    await createNote(request, response);
    return;
  }

  methodNotAllowed(response);
}

async function listNotes(response: JsonResponse) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('studio_notes')
    .select('id,note_text,note_date,created_at')
    .order('note_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    response.status(500).json({ error: 'Notlar alınamadı' });
    return;
  }

  response.status(200).json({ notes: data as StudioNote[] });
}

async function createNote(request: ApiRequest, response: JsonResponse) {
  const body = await readRequestBody(request);
  const noteText = typeof body.note_text === 'string' ? body.note_text.trim() : '';
  const noteDate = typeof body.note_date === 'string' && body.note_date ? body.note_date : new Date().toISOString();

  if (!noteText) {
    response.status(400).json({ error: 'Not boş olamaz' });
    return;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('studio_notes')
    .insert({ note_text: noteText, note_date: noteDate })
    .select('id,note_text,note_date,created_at')
    .single();

  if (error) {
    response.status(500).json({ error: 'Not kaydedilemedi' });
    return;
  }

  response.status(201).json({ note: data as StudioNote });
}
