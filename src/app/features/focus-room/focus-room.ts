import { Component } from '@angular/core';

@Component({
  selector: 'app-focus-room',
  imports: [],
  templateUrl: './focus-room.html',
  styleUrl: './focus-room.css',
})
export class FocusRoom {
isLightTheme = false;

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
  }
}
