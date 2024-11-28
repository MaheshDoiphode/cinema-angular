import { Routes } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TempComponent } from './shared/components/temp/temp.component';
import { FaqComponent } from './shared/components/faq/faq.component';
import { LoginComponent } from './auth/login/login.component';
import {RegisterComponent } from './auth/register/register.component';
import {ForgotPasswordComponent} from './auth/register/forgotpassword.component';
export const routes: Routes = [
    {path: 'faq', component: FaqComponent},
    {path: 'temp', component: TempComponent},
    {path: 'footer', component: FooterComponent},
    {path: 'header', component: HeaderComponent},
    {path: '/auth/login', component: LoginComponent},
    {path: '/auth/register', component: RegisterComponent},
    {path: '/auth/forgot-password', component: ForgotPasswordComponent}
];
