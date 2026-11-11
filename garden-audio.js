// Local music needs no third-party streaming connection. Browsers may require
// one user gesture before audio; keep trying on gestures until it is unlocked.
let context, music, restoreVolume;
const musicVolume = .23;
function updateStatus() {
  const playing = music && !music.paused && !music.error;
  document.getElementById('soundText').textContent = playing ? 'Nhạc vui đang phát' : 'Chạm để nghe nhạc ♫';
  document.getElementById('soundToggle').setAttribute('aria-label', playing ? 'Nhạc nền đang phát liên tục' : 'Chạm để khởi động nhạc nền');
  document.getElementById('soundToggle').classList.toggle('is-playing', !!playing);
}
function unlockAudio() {
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (Audio) {
      context ??= new Audio();
      if (context.state !== 'running') context.resume().catch(() => {});
    }
    if (music.paused) music.play().then(updateStatus).catch(updateStatus);
  } catch { updateStatus(); }
}
export function startGardenAudio() {
  music = document.getElementById('backgroundMusic');
  music.volume = musicVolume;
  music.addEventListener('playing', updateStatus);
  music.addEventListener('pause', updateStatus);
  music.addEventListener('error', () => {
    updateStatus();
    document.getElementById('soundText').textContent = 'Chạm để thử lại nhạc ♫';
  });
  document.getElementById('soundToggle').onclick = () => {
    if (music.error) music.load();
    unlockAudio();
  };
  for (const event of ['pointerdown', 'touchend', 'keydown'])
    document.addEventListener(event, unlockAudio, { passive: true, capture: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) unlockAudio(); });
  window.addEventListener('pageshow', unlockAudio);
  updateStatus();
  // Try native autoplay immediately; unlock the effects context on the first touch.
  music.play().then(updateStatus).catch(updateStatus);
}
function tone(frequency, at, duration, volume, type = 'sine', endFrequency) {
  const oscillator = context.createOscillator(), gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, at);
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, at + duration * .7);
  gain.gain.setValueAtTime(.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + .012);
  gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
  oscillator.connect(gain); gain.connect(context.destination);
  oscillator.start(at); oscillator.stop(at + duration + .02);
  oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
}
export function playSticker(kind) {
  if (!context || context.state !== 'running') return;
  const at = context.currentTime;
  // A soft rubbery pop + a short sparkling melody, warm for both emotions.
  tone(kind === 'happy' ? 440 : 330, at, .19, .11, 'sine', 920);
  const notes = kind === 'happy' ? [784, 988, 1175, 1568] : [659, 784, 988, 1319];
  notes.forEach((note, i) => {
    tone(note, at + .09 + i * .085, .38, .047);
    tone(note * 2, at + .09 + i * .085, .23, .009);
  });
  if (music) {
    music.volume = .12;
    clearTimeout(restoreVolume);
    restoreVolume = setTimeout(() => { music.volume = musicVolume; }, 800);
  }
}
