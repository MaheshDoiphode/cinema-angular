import { Component } from '@angular/core';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FaqComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
}
