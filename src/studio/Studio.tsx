import { FormEvent, useEffect, useMemo, useState } from 'react';
import './Studio.css';

type StudioNote = {
  id: string;
  note_text: string;
  note_date: string;
  created_at: string;
};

export default function Studio() {
  const [password, setPassword] = useState('');
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<StudioNote[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const groupedNotes = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      formattedDate: new Intl.DateTimeFormat('tr-TR', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(note.note_date))
    }));
  }, [notes]);

  useEffect(() => {
    void loadNotes();
  }, []);

  async function loadNotes() {
    setIsLoading(true);
    setError('');

    const response = await fetch('/api/studio/notes');

    if (response.status === 401) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    if (!response.headers.get('content-type')?.includes('application/json')) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    if (!response.ok) {
      setError('Notlar alınamadı.');
      setIsLoading(false);
      return;
    }

    const data = (await response.json()) as { notes: StudioNote[] };
    setNotes(data.notes);
    setIsAuthenticated(true);
    setIsLoading(false);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/studio/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      setError('Şifre olmadı.');
      return;
    }

    setPassword('');
    setIsAuthenticated(true);
    await loadNotes();
  }

  async function handleLogout() {
    await fetch('/api/studio/logout', { method: 'POST' });
    setNotes([]);
    setIsAuthenticated(false);
  }

  async function handleCreateNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!noteText.trim()) {
      setError('Not boş kalmasın.');
      return;
    }

    const response = await fetch('/api/studio/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note_text: noteText })
    });

    if (!response.ok) {
      setError('Not kaydedilemedi.');
      return;
    }

    setNoteText('');
    await loadNotes();
  }

  if (isLoading) {
    return <main className="studio-page">Yükleniyor...</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="studio-page studio-page--login">
        <form className="studio-login" onSubmit={handleLogin}>
          <h1>Studio</h1>
          <input
            autoFocus
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Şifre"
            aria-label="Studio şifresi"
          />
          <button type="submit">Giriş</button>
          {error && <p role="alert">{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="studio-page">
      <header className="studio-header">
        <div>
          <p>Marul</p>
          <h1>Studio</h1>
        </div>
        <button type="button" onClick={handleLogout}>
          Çıkış
        </button>
      </header>

      <form className="studio-compose" onSubmit={handleCreateNote}>
        <textarea
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          placeholder="Yeni not..."
          aria-label="Yeni not"
        />
        <button type="submit">Kaydet</button>
      </form>

      {error && <p className="studio-error" role="alert">{error}</p>}

      <section className="studio-notes" aria-label="Studio notları">
        {groupedNotes.map((note) => (
          <article className="studio-note" key={note.id}>
            <time dateTime={note.note_date}>{note.formattedDate}</time>
            <p>{note.note_text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
