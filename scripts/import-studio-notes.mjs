import process from 'node:process';
import { readFile } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';

const notesPath = process.argv[2] ?? 'tum_notlar.md';
const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.');
  process.exit(1);
}

const source = await readFile(notesPath, 'utf8');
const noteBlocks = source
  .split(/^### Not \d+\s*$/gm)
  .slice(1)
  .map((block) => block.replace(/^\*\*İçerik:\*\*\s*/m, '').trim())
  .filter(Boolean);

if (noteBlocks.length === 0) {
  console.error(`No notes were found in ${notesPath}.`);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const rows = noteBlocks.map((noteText, index) => ({
  note_text: noteText,
  note_date: new Date(Date.now() - index * 1000).toISOString()
}));

const { error } = await supabase.from('studio_notes').insert(rows);

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`Imported ${rows.length} studio notes.`);
