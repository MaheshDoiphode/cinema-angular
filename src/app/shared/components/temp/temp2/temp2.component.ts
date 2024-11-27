import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempComponent } from '../temp.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-temp2',
  standalone: true,
  imports: [CommonModule, TempComponent, FooterComponent, HeaderComponent],
  templateUrl: './temp2.component.html',
  styleUrls: ['./temp2.component.css'],
})
export class Temp2Component  {
}