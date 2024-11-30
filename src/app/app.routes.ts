import { Routes } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TempComponent } from './shared/components/temp/temp.component';
import { FaqComponent } from './shared/components/faq/faq.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChooseCityComponent } from './shared/components/choose-city/choose-city.component';
import { HomeComponent } from './user/home/home.component';
export const routes: Routes = [
    // Redirect empty path to login
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    
    // Auth routes
    {path: 'auth/login', component: LoginComponent},
    {path: 'auth/register', component: RegisterComponent},
    {path: 'auth/forgot-password', component: ForgotPasswordComponent},
    
    // Other routes
    {path: 'faq', component: FaqComponent},
    {path: 'temp', component: TempComponent},
    {path: 'footer', component: FooterComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'choose-city', component: ChooseCityComponent},
    
    // user related routes. 
    {path: 'home', component: HomeComponent},

    // Wildcard route for 404
    {path: '**', redirectTo: 'auth/login'}
];