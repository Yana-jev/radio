import { Injectable, signal } from '@angular/core';
import { MusicTrack, NoiseChannel } from '../interface/audio-type.ts';

@Injectable({
  providedIn: 'root',
})
export class AudioEngineService {

readonly musicTracks: MusicTrack[] = [
    { id: 'synth', name: 'Synthwave', bpm: 120, url: 'assets/audio/synth-loop.mp3' },
    { id: 'techno', name: 'Minimal Techno', bpm: 125, url: 'assets/audio/techno-loop.mp3' },
    { id: 'ambient', name: 'Ambient Flow', bpm: 90, url: 'assets/audio/ambient-loop.mp3' }
  ];

  // Сигнал для каналов шума, чтобы интерфейс мгновенно реагировал на изменения
  readonly noiseChannels = signal<NoiseChannel[]>([
    { id: 'brown', name: 'Brown Noise', icon: '🟫', url: 'assets/audio/brown-noise.mp3', volume: 0 },
    { id: 'rain', name: 'Rainforest', icon: '🌧', url: 'assets/audio/rain.mp3', volume: 0 },
    { id: 'cafe', name: 'Coffee Shop', icon: '☕', url: 'assets/audio/cafe.mp3', volume: 0 }
  ]);

  // 2. СОСТОЯНИЕ ПЛЕЕРА (Используем Signals для реактивности)
  readonly currentTrackId = signal<string | null>(null);
  readonly isPlaying = signal<boolean>(false);
  private currentMusicAudio?: HTMLAudioElement;

  // 3. УПРАВЛЕНИЕ МУЗЫКАЛЬНЫМ ТРЕКОМ
  selectTrack(trackId: string) {
    if (this.currentMusicAudio) {
      this.currentMusicAudio.pause();
    }

    this.currentTrackId.set(trackId);
    const track = this.musicTracks.find(t => t.id === trackId);
    
    if (track) {
      this.currentMusicAudio = new Audio(track.url);
      this.currentMusicAudio.loop = true; // Зацикливаем звук для непрерывного фокуса
      
      // Если плеер уже играет, сразу запускаем новый выбранный трек
      if (this.isPlaying()) {
        this.currentMusicAudio.play().catch(err => console.log('Ожидание действия пользователя...', err));
      }
    }
  }


  togglePlay() {
    if (!this.currentTrackId()) return; // Если трек не выбран, ничего не делаем

    const newState = !this.isPlaying();
    this.isPlaying.set(newState);

    if (newState) {
      this.currentMusicAudio?.play();
      
      // Включаем все шумы, у которых громкость больше нуля
      this.noiseChannels().forEach(ch => {
        if (ch.volume > 0) this.playNoiseElement(ch);
      });
    } else {
      // Ставим на паузу абсолютно всё
      this.currentMusicAudio?.pause();
      this.noiseChannels().forEach(ch => ch.audio?.pause());
    }
  }

  // 4. УПРАВЛЕНИЕ МИКШЕРОМ ШУМОВ
  setNoiseVolume(id: string, volume: number) {
    this.noiseChannels.update(channels => 
      channels.map(ch => {
        if (ch.id === id) {
          ch.volume = volume;
          
          // Создаем аудио-объект только тогда, когда пользователь сдвинул ползунок (ленивая загрузка)
          if (!ch.audio) {
            ch.audio = new Audio(ch.url);
            ch.audio.loop = true;
          }
          
          ch.audio.volume = volume;

          // Если плеер активен, управляем воспроизведением шума на лету
          if (this.isPlaying()) {
            if (volume > 0) ch.audio.play().catch(() => {});
            else ch.audio.pause();
          }
        }
        return ch;
      })
    );
  }

  private playNoiseElement(ch: NoiseChannel) {
    if (!ch.audio) {
      ch.audio = new Audio(ch.url);
      ch.audio.loop = true;
    }
    ch.audio.volume = ch.volume;
    ch.audio.play().catch(() => {});
  }
}
