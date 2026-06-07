
export interface MusicTrack {
  id: string;        
  name: string;      
  bpm: number;       
  url: string;       
}

export interface NoiseChannel {
  id: string;        
  name: string;      
  icon: string;      
  url: string;       
  volume: number;    
  audio?: HTMLAudioElement; 
}