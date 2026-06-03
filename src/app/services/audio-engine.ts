import { Injectable, signal } from '@angular/core';
import { MusicTrack, NoiseChannel } from '../interface/audio-type.ts';

@Injectable({
  providedIn: 'root',
})
export class AudioEngine {

  readonly musicTracks: MusicTrack[] = [
    { id: 'synth', name: '01.synthwave_pulse', bpm: 120, url: 'assets/audio/synth-loop.mp3' },
    { id: 'techno', name: '02.minimal_techno', bpm: 125, url: 'assets/audio/techno-loop.mp3' },
    { id: 'ambient', name: '03.ambient_flow', bpm: 90, url: 'assets/audio/ambient-loop.mp3' }
  ];


  readonly noiseChannels = signal<NoiseChannel[]>([
    { id: 'brown', name: 'BROWN_NOISE', icon: '🟫', url: 'assets/audio/brown-noise.mp3', volume: 0 },
    { id: 'rain', name: 'RAIN_FOREST', icon: '🌧', url: 'assets/audio/rain.mp3', volume: 0 },
    { id: 'cafe', name: 'COFFEE_SHOP', icon: '☕', url: 'assets/audio/cafe.mp3', volume: 0 }
  ]);
}
