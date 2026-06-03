import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FocusRoom } from './features/focus-room/focus-room';

@Component({
  selector: 'app-root',
  imports: [FocusRoom, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('radio');
}
