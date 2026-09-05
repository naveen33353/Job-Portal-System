import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {

    const role = localStorage.getItem('role');

    if (role === 'COMPANY') {
      router.navigate(['/company/company-dashboard']);
    } else {
      router.navigate(['/seeker/jobseeker-dashboard']);
    }

    return false;
  }

  return true;
};