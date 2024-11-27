import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, NO_ERRORS_SCHEMA, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import '@widgetbot/html-embed';

@Component({
  selector: 'app-discord',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discord.component.html',
  styleUrl: './discord.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class DiscordComponent implements OnChanges {
  @Input() server!: string;
  @Input() channel!: string;
  @Input() useHtmlEmbed: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['server'] || changes['channel'] || changes['useHtmlEmbed']) {
      this.loadDiscordWidget();
    }
  }

  private loadDiscordWidget(): void {
    const existingScript = document.querySelector(`script[src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3"]`);
    if (existingScript) {
      existingScript.remove();
    }

    if (this.useHtmlEmbed) {
      this.el.nativeElement.innerHTML = `<widgetbot
        server="${this.server}"
        channel="${this.channel}"
        class="w-full h-2/3"
      ></widgetbot>`;
    } else {
      const script = this.renderer.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        new (window as any).Crate({
          server: this.server,
          channel: this.channel,
        });
      };
      this.renderer.appendChild(this.el.nativeElement, script);
    }
  }
}