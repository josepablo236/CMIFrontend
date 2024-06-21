import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServiceApiService } from './services/service-api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServiceApiService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log("Estoy loggeado");
    return true;
  } else {
    console.log("No estoy loggeado");
    router.navigate(['/login']);
    return false;
  }
};
