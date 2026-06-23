import { Injectable, signal } from '@angular/core';
import { MusicTrack, NoiseChannel } from '../interface/audio-type';



@Injectable({
  providedIn: 'root',
})
export class AudioEngineService {
  readonly musicTracks: MusicTrack[] = [
    { id: '1', name: 'Minimalist', bpm: 120, url: 'assets/audio/synth-loop.mp3' },
    { id: '2', name: 'Ambient', bpm: 125, url: 'assets/audio/techno-loop.mp3' },
    { id: '3', name: 'Chill', bpm: 90, url: 'assets/audio/ambient-loop.mp3' },
  ];

  // noises signal

  readonly noiseChannels = signal<NoiseChannel[]>([
    { id: '1', name: 'Ocean Waves', icon: '🌊', url: 'assets/audio/ocean_waves.mp3', volume: 0 },
    { id: '2', name: 'Rainforest', icon: '🌧', url: 'assets/audio/rain.mp3', volume: 0 },
    {id: '3', name: 'Spaceship cabin', icon: '🛸', url: 'assets/audio/spaceship_cabin.mp3', volume: 0,},
  ]);

  readonly currentTrackId = signal<string | null>(null);
  readonly isPlaying = signal<boolean>(false);
  readonly musicVolume = signal<number>(0.5);
  private currentMusicAudio?: HTMLAudioElement;

  // tracks control
  selectTrack(trackId: string) {
    if (this.currentMusicAudio) {
      this.currentMusicAudio.pause();
    }
    this.currentTrackId.set(trackId);
    const track = this.musicTracks.find((t) => t.id === trackId);
    if (track) {
      this.currentMusicAudio = new Audio(track.url);
      this.currentMusicAudio.loop = true;
      this.currentMusicAudio.volume = this.musicVolume();
      if (this.isPlaying()) {
        this.currentMusicAudio.play().catch((err) => console.log('waiting user action...', err));
      }
    }
  }

  setMusicVolume(volume: number) {
    this.musicVolume.set(volume);
    if (this.currentMusicAudio) {
      this.currentMusicAudio.volume = volume;
    }
  }

  // main start
  togglePlay() {
    if (!this.currentTrackId()) return; // Если трек не выбран, ничего не делаем
    const newState = !this.isPlaying();
    this.isPlaying.set(newState);
    if (newState) {
      this.currentMusicAudio?.play();

      // play noises
      this.noiseChannels().forEach((ch) => {
        if (ch.volume > 0) this.playNoiseElement(ch);
      });
    } else {
      // pause control
      this.currentMusicAudio?.pause();
      this.noiseChannels().forEach((ch) => ch.audio?.pause());
    }
  }

  // mixer control
  setNoiseVolume(id: string, volume: number) {
    this.noiseChannels.update((channels) =>
      channels.map((ch) => {
        if (ch.id === id) {
          ch.volume = volume;

          // lazy loading
          if (!ch.audio) {
            ch.audio = new Audio(ch.url);
            ch.audio.loop = true;
          }
          ch.audio.volume = volume;
          if (this.isPlaying()) {
            if (volume > 0) ch.audio.play().catch(() => {});
            else ch.audio.pause();
          }
        }
        return ch;
      }),
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
