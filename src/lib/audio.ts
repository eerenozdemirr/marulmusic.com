const SOUND_STORAGE_KEY = 'marul:sound-enabled';
export const SOUND_STATE_EVENT = 'marul:sound-state';

export function isSoundEnabled() {
  if (typeof window === 'undefined') {
    return true;
  }

  return window.localStorage.getItem(SOUND_STORAGE_KEY) !== 'off';
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(SOUND_STORAGE_KEY, enabled ? 'on' : 'off');
  window.dispatchEvent(new CustomEvent(SOUND_STATE_EVENT, { detail: { enabled } }));
}

export async function playAudioElement(audioElement: HTMLAudioElement | null) {
  if (!audioElement || !isSoundEnabled()) {
    return false;
  }

  try {
    await audioElement.play();
    return true;
  } catch {
    return false;
  }
}

export async function playAudioFile(src: string, options: { loop?: boolean } = {}) {
  if (!isSoundEnabled()) {
    return null;
  }

  const audio = new Audio(src);
  audio.loop = Boolean(options.loop);

  try {
    await audio.play();
    return audio;
  } catch {
    return null;
  }
}

export function stopAudio(audioElement: HTMLAudioElement | null) {
  if (!audioElement) {
    return;
  }

  audioElement.pause();
  audioElement.currentTime = 0;
}
