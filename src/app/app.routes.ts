import { Routes, CanActivate } from '@angular/router';
import { AuthGuard as AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];
