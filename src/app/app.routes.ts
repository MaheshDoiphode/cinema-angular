import { Routes } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TempComponent } from './shared/components/temp/temp.component';
import { FaqComponent } from './shared/components/faq/faq.component';

export const routes: Routes = [
    {path: 'faq', component: FaqComponent},
    {path: 'temp', component: TempComponent},
    {path: 'footer', component: FooterComponent},
    {path: 'header', component: HeaderComponent},
];
