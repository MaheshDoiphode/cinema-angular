import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class HeaderComponent {
  menuOpen: boolean = false;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isScrolled = offset > 0;
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
