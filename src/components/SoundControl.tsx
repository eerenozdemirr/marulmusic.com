import { useEffect, useState } from 'react';
import { isSoundEnabled, setSoundEnabled, SOUND_STATE_EVENT } from '../lib/audio';
import './SoundControl.css';

export default function SoundControl() {
  const [enabled, setEnabled] = useState(() => isSoundEnabled());

  useEffect(() => {
    const syncState = (event: Event) => {
      const customEvent = event as CustomEvent<{ enabled: boolean }>;
      setEnabled(customEvent.detail.enabled);
    };

    window.addEventListener(SOUND_STATE_EVENT, syncState);
    return () => window.removeEventListener(SOUND_STATE_EVENT, syncState);
  }, []);

  return (
    <button
      className="sound-control"
      type="button"
      aria-label={enabled ? 'Sesi kapat' : 'Sesi aç'}
      aria-pressed={enabled}
      onClick={() => {
        const nextEnabled = !enabled;
        setEnabled(nextEnabled);
        setSoundEnabled(nextEnabled);
      }}
    >
      {enabled ? 'Ses açık' : 'Sessiz'}
    </button>
  );
}
