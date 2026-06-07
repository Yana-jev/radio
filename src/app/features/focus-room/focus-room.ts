import { Component, inject, OnInit } from '@angular/core';
import { AudioEngineService } from '../../services/audio-engine';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-focus-room',
  imports: [CommonModule],
  templateUrl: './focus-room.html',
  styleUrl: './focus-room.css',
})
export class FocusRoom implements OnInit {
protected audioEngine = inject(AudioEngineService);

  isLightTheme = false;

  ngOnInit(){
    const firstTrack = this.audioEngine.musicTracks[0];
    if(firstTrack){
      this.audioEngine.selectTrack(firstTrack.id)
          }

  }
  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
  }

  get tracks() {
    return this.audioEngine.musicTracks;
  }


  get noiseChannels() {
    return this.audioEngine.noiseChannels;
  }


  isTrackActive(trackId: string): boolean {
    return this.audioEngine.currentTrackId() === trackId;
  }


  onSelectTrack(trackId: string): void {
    this.audioEngine.selectTrack(trackId);
  }


  onTogglePlay(): void {
    this.audioEngine.togglePlay();
  }


  onVolumeChange(id: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioEngine.setNoiseVolume(id, parseFloat(input.value));
  }
  get currentBpm(): number | string {
  const currentId = this.audioEngine.currentTrackId();
  if (!currentId) return '---';

  const track = this.audioEngine.musicTracks.find(t => t.id === currentId);
  return track ? track.bpm : '---';
}
}
