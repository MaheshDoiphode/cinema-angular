import { Component } from '@angular/core';
import { CarousalFeatures1Component } from './carousal-features-1/carousal-features-1.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CarousalFeatures1Component, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  leaderboards = [
    {
      title: 'Coins Earned',
      items: [
        { imgSrc: 'assets/cat4.jpg', name: 'NinjaGamer123', value: '12,450' },
        { imgSrc: 'assets/cat2.jpg', name: 'ProFrags420', value: '10,875' },
        { imgSrc: 'assets/cat4.jpg', name: 'HeadshotQueen', value: '9,230' },
        { imgSrc: 'assets/cat3.jpg', name: 'ClutchKing', value: '8,195' },
        { imgSrc: 'assets/cat.jpg', name: 'AcePlayer007', value: '7,650' }
      ]
    },
    {
      title: 'Tournaments Won',
      items: [
        { imgSrc: 'assets/cat.jpg', name: 'TeamDomination', value: '5' },
        { imgSrc: 'assets/cat.jpg', name: 'VictorySquad', value: '4' },
        { imgSrc: 'assets/cat4.jpg', name: 'EliteGamers', value: '3' },
        { imgSrc: 'assets/cat.jpg', name: 'ProG squad', value: '2' },
        { imgSrc: 'assets/cat3.jpg', name: 'GamingLegends', value: '1' }
      ]
    },
    {
      title: 'Win Rate (Valorant)',
      items: [
        { imgSrc: 'assets/cat2.jpg', name: 'AimBotMaster', value: '85%' },
        { imgSrc: 'assets/cat.jpg', name: 'CrosshairGod', value: '78%' },
        { imgSrc: 'assets/cat4.jpg', name: 'ReynaMain', value: '72%' },
        { imgSrc: 'assets/cat3.jpg', name: 'JettJumps', value: '69%' },
        { imgSrc: 'assets/cat2.jpg', name: 'CypherSensei', value: '65%' }
      ]
    }
  ];

  events: Event[] = [
    {
      date: 'January 13th, 2022',
      matches: [
        {
          imgSrc: 'assets/cat.jpg',
          altText: 'Team Liquid vs OG',
          teams: 'Team Liquid vs OG',
          description: 'Dota 2 - The International 2022',
          result: 'Upper Bracket Round 1 - Team Liquid wins 2-1',
          type: 'Tournament'
        },
        {
          imgSrc: 'assets/cat2.jpg',
          altText: 'FaZe Clan vs NAVI',
          teams: 'FaZe Clan vs NAVI',
          description: 'CS:GO - IEM Cologne 2022',
          result: '',
          type: 'Match'
        }
      ]
    },
    {
      date: 'January 12th, 2022',
      matches: [
        {
          imgSrc: 'assets/cat4.jpg',
          altText: 'T1 vs Gen.G',
          teams: 'T1 vs Gen.G',
          description: 'League of Legends - LCK Summer 2022',
          result: 'Regular Season - T1 wins 2-0',
          type: 'Match'
        },
        {
          imgSrc: 'assets/cat.jpg',
          altText: 'OpTic Gaming vs LOUD',
          teams: 'OpTic Gaming vs LOUD',
          description: 'Valorant - Champions 2022',
          result: '',
          type: 'Tournament'
        },
        {
          imgSrc: 'assets/cat2.jpg',
          altText: 'G2 Esports vs Fnatic',
          teams: 'G2 Esports vs Fnatic',
          description: 'League of Legends - LEC Spring 2022',
          result: 'Playoffs - G2 Esports wins 3-0',
          type: 'Tournament'
        },
        {
          imgSrc: 'assets/cat3.jpg',
          altText: '100 Thieves vs Cloud9',
          teams: '100 Thieves vs Cloud9',
          description: 'Valorant - VCT NA Stage 1',
          result: '100 Thieves wins 2-1',
          type: 'Match'
        }
      ]
    }
  ];

  polls: Poll[] = [
    {
      iconPath: 'M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zM12 6v6l4.5 4.5M12 6v6l-4.5 4.5',
      title: 'Next Tournament Game?',
      description: 'Help us decide which game should be featured in the upcoming tournament!',
      linkText: 'Vote Now',
      linkHref: '#'
    },
    {
      iconPath: 'M9 5l7 7-7 7',
      title: 'Map Preferences',
      description: 'Share your favorite maps for each game and influence the tournament map pool.',
      linkText: 'Submit Your Picks',
      linkHref: '#'
    },
    {
      iconPath: 'M5 13l4 4L19 7',
      title: 'Future Event Ideas',
      description: 'Have a great idea for a future tournament or event? Let us know!',
      linkText: 'Share Your Ideas',
      linkHref: '#'
    }
  ];
}


export interface Event {
  date: string;
  matches: {
    imgSrc: string;
    altText: string;
    teams: string;
    description: string;
    result: string;
    type: string;
  }[];
}

export interface Poll {
  iconPath: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}