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
        id: 'faq-booking',
        heading: 'How do I book movie tickets?',
        bodyText: 'Booking tickets is easy! Simply select your city, choose your movie, pick your preferred cinema and showtime, select your seats, and complete the payment.',
        links: []
      },
      {
        id: 'faq-cancellation',
        heading: 'What is the cancellation policy?',
        bodyText: 'Tickets can be cancelled up to 2 hours before showtime. Refund amount may vary based on cancellation time and payment method.',
        links: []
      },
      {
        id: 'faq-payment',
        heading: 'What payment methods are accepted?',
        bodyText: 'We accept all major credit/debit cards, net banking, UPI, and digital wallets for secure and convenient payments.',
        links: []
      }
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
