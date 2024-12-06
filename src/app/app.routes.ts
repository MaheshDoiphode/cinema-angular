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
import { FilmDetailsComponent } from './user/film-details/film-details.component';
import { SelectCinemaComponent } from './user/select-cinema/select-cinema.component';
import { BookComponent } from './user/book/book.component';
import { PaymentConfirmationComponent } from './shared/components/payment-confirmation/payment-confirmation.component';
import { TicketsComponent } from './user/tickets/tickets.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { CinemaOwnerDashComponent } from './user/cinema-owner-dash/cinema-owner-dash.component';
import { EditHallsComponent } from './user/cinema-owner-dash/edit-halls/edit-halls.component';
import { EditProjectionsComponent } from './user/cinema-owner-dash/edit-projections/edit-projections.component';

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
    {path: 'film-details/:id', component: FilmDetailsComponent},
    {path: 'select-cinema/:id', component: SelectCinemaComponent},
    {path: 'book/:filmId/:cinemaId', component: BookComponent},
    {path: 'payment-confirmation', component: PaymentConfirmationComponent},
    {path: 'tickets', component: TicketsComponent},
    {path: 'dashboard', component: DashboardComponent},

    // Cinema owner routes
    {path: 'cinema-owner-dash', component: CinemaOwnerDashComponent},
    {path: 'edit-halls', component: EditHallsComponent},
    {path: 'edit-projections',component: EditProjectionsComponent},

    // Wildcard route for 404
    {path: '**', redirectTo: 'auth/login'}
];