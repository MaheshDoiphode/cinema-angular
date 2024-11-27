import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-temp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temp.component.html',
  styleUrl: './temp.component.css'
})
export class TempComponent {

  showFullDescription = false;

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
}
