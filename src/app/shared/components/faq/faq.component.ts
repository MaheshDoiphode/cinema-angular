import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Accordion } from 'flowbite';
import type { AccordionOptions, AccordionItem, AccordionInterface } from 'flowbite';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements AfterViewInit {
  accordionItems = [
    {
      id: 'faq-safety',
      heading: 'Is Esports a safe gaming platform?',
      bodyText: 'Esports ensures a safe and secure gaming environment. Our fraud detection team actively works to maintain fair play, making Esports a trustworthy platform for gamers.',
      links: []
    },
    {
      id: 'faq-winning',
      heading: 'Do players really win money on Esports?',
      bodyText: 'Absolutely! Numerous players have already secured significant prizes on Esports, and you can be one of them. We host various cash contests with different entry fees and prize pools. Select a contest, showcase your skills, and stand a chance to win big!',
      links: []
    },
    {
      id: 'faq-add-money',
      heading: 'Is it safe to add money to Esports?',
      bodyText: 'Adding funds to your Esports account is both safe and straightforward. We offer multiple secure payment options and prioritize the protection of your personal information.',
      links: []
    },
    {
      id: 'faq-currency',
      heading: 'What is the currency used on Esports?',
      bodyText: 'Esports employs its own currency for game entries and prize distribution, ensuring seamless transactions within the platform.',
      links: []
    },
    {
      id: 'faq-contests',
      heading: 'What types of contests are available on Esports?',
      bodyText: 'Esports offers a variety of contests, including solo matches, team matches, and tournaments across popular games. Whether you prefer individual challenges or group competitions, there\'s something for everyone.',
      links: []
    },
    {
      id: 'faq-prizes',
      heading: 'How are prizes distributed on Esports?',
      bodyText: 'Prizes on Esports are distributed in the form of coins to your platform wallet, which can then be withdrawn via various payment methods such as UPI, gift cards, or cryptocurrency. Additionally, we offer loyalty programs and reward structures to enhance your gaming experience.',
      links: []
    },
    {
      id: 'faq-community',
      heading: 'How can I engage with the Esports community?',
      bodyText: 'Esports fosters community engagement through dedicated Discord channels, forums for sharing game guides and tips, and regular updates on user feedback and new features. Join discussions, connect with fellow gamers, and stay updated on the latest trends!',
      links: []
    },
  ];


  ngAfterViewInit(): void {
    const accordionEl = document.querySelector('#accordion-example') as HTMLElement;

    const accordionItems: AccordionItem[] = this.accordionItems.map(item => ({
      id: item.id,
      triggerEl: document.querySelector(`#${item.id}`) as HTMLElement,
      targetEl: document.querySelector(`#${item.id}-body`) as HTMLElement,
      active: false
    }));

    const options: AccordionOptions = {
      alwaysOpen: true,
      activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400',
      onOpen: (accordion: AccordionInterface, item: AccordionItem) => {
        this.toggleIcon(item.triggerEl, true);
      },
      onClose: (accordion: AccordionInterface, item: AccordionItem) => {
        this.toggleIcon(item.triggerEl, false);
      },
      onToggle: (accordion: AccordionInterface, item: AccordionItem) => {
        this.toggleIcon(item.triggerEl, item.active ?? false);
      },
    };

    new Accordion(accordionEl, accordionItems, options);
  }

  toggleIcon(triggerEl: HTMLElement, isOpen: boolean) {
    const iconEl = triggerEl.querySelector('.material-symbols-outlined');
    if (iconEl) {
      iconEl.textContent = isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }
  }
}
