import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' } // Redirecciona a login por defecto
];
