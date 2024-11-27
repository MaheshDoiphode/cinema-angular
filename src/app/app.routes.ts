import { Routes } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LandingPageComponent } from './core/components/landing-page/landing-page.component';
import { TempComponent } from './shared/components/temp/temp.component';
import { Temp2Component } from './shared/components/temp/temp2/temp2.component';
import { CarousalFeatures1Component } from './core/components/landing-page/carousal-features-1/carousal-features-1.component';
import { FaqComponent } from './shared/components/faq/faq.component';
import { DiscordComponent } from './shared/components/discord/discord.component';
import { GeneralHomeComponent } from './core/components/general-home/general-home.component';

export const routes: Routes = [
    {path: 'general-home', component: GeneralHomeComponent},
    {path: 'landing-page', component: LandingPageComponent},
    {path: 'carousal-features-1', component: CarousalFeatures1Component},
    {path: 'faq', component: FaqComponent},
    {path: 'discord', component: DiscordComponent},
    {path: 'temp', component: TempComponent},
    {path: 'temp2', component: Temp2Component},
    {path: 'footer', component: FooterComponent},
    {path: 'header', component: HeaderComponent},
];
