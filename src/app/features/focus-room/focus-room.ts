import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AudioEngineService } from '../../services/audio-engine';
import { CommonModule } from '@angular/common';
import { Atom } from '../../interface/audio-type.ts';

@Component({
  selector: 'app-focus-room',
  imports: [CommonModule],
  templateUrl: './focus-room.html',
  styleUrl: './focus-room.css',
})
export class FocusRoom implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('particlesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  protected audioEngine = inject(AudioEngineService);
  isLightTheme = false;

  private ctx!: CanvasRenderingContext2D;
  private atoms: Atom[] = [];
  private animationId!: number;
  private numAtoms = 250;

  ngOnInit(){
    const firstTrack = this.audioEngine.musicTracks[0];
    if(firstTrack){
      this.audioEngine.selectTrack(firstTrack.id)
          }
  }

  ngAfterViewInit(){
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = 280;
    canvas.height = 280;
    this.initAtoms()
    this.animate()
  }

  ngOnDestroy(): void {
    if(this.animationId){
      cancelAnimationFrame(this.animationId)
    }
  }


  //animation

private initAtoms(){
  this.atoms = [];
  const centerX = 140;
  const centerY = 140;

  for( let i = 0; i < this.numAtoms; i++){
    const angle = Math.random() * Math.PI  * 2;
    const radiusFromCenter = Math.random() * 135;

    this.atoms.push({
        x: centerX + Math.cos(angle) * radiusFromCenter,
        y: centerY + Math.sin(angle) * radiusFromCenter,
        vx: (Math.random() - 0.5) * 0.4,//speed from -0.2 to 0.2
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1, 
        alpha: Math.random() * 0.5 + 0.45,
        alphaSpeed: 0.003 + Math.random() * 0.007
      });
    }
  }

private animate() {
    this.animationId = requestAnimationFrame(() => this.animate()); //is called60 times per second

    this.ctx.clearRect(0, 0, 280, 280);     //clear all
    
    const centerX = 140;
    const centerY = 140;
    const isPlaying = this.audioEngine.isPlaying();
    
    // color for each theme
    const color = this.isLightTheme ? '51, 65, 85' : '157, 78, 221';

    this.atoms.forEach (atom => {
  const dx = atom.x - centerX; //from atom to center horizontal
  const dy = atom.y - centerY; // from atom to center vertical
  const dist = Math.sqrt(dx * dx + dy * dy); // from atom to center (hipotenuse)

  if (isPlaying) {
    // vortex
    // if dist === 0, put 1 to avoid dividing by zero
    const currentDist = dist || 1; 
    
    // gravity
    const force = (135 - dist) * 0.00025;
    
    atom.vx += force * (-dy / currentDist) - dx * 0.00006;
    atom.vy += force * (dx / currentDist) - dy * 0.00006;
    
    atom.x += atom.vx * 0.8;
    atom.y += atom.vy * 0.8;
  } else {
    // pause
    atom.x += atom.vx * 0.25;
    atom.y += atom.vy * 0.25;
  }


  // radius protect
  // the atom will bounce off if it flies outside the circle
  if (dist > 135) {
    const currentDist = dist || 1;
    atom.x = centerX + (dx / currentDist) * 133;
    atom.y = centerY + (dy / currentDist) * 133;
    
    atom.vx = -atom.vx * 0.8;
    atom.vy = -atom.vy * 0.8;
  }


  atom.alpha += atom.alphaSpeed;
  if (atom.alpha > 0.95 || atom.alpha < 0.3) {
    atom.alphaSpeed *= -1;
  }


  this.ctx.beginPath();
  this.ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
  this.ctx.fillStyle = `rgba(${color}, ${atom.alpha})`;
  this.ctx.fill();
});
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