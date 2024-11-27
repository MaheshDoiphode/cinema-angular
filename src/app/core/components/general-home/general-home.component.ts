import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { DiscordComponent } from '../../../shared/components/discord/discord.component';

@Component({
  selector: 'app-general-home',
  standalone: true,
  imports: [DiscordComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './general-home.component.html',
  styleUrl: './general-home.component.css'
})
export class GeneralHomeComponent {
  server: string = '1141726371580760114'
  channel: string = '1212644163150024724'

  tab: string = 'all';
  events = [
    { title: 'Event 1', date: 'Today' },
    { title: 'Event 2', date: 'Tomorrow' },
    { title: 'Event 3', date: 'Yesterday' },
    // More events...
  ];

  filter(type: string) {
    // Add filtering logic based on type (solo, matches, tournaments)
  }
}
