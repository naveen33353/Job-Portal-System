import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

/**
 * Guards routes that only make sense for a logged-in job seeker
 * (dashboard, profile, saved jobs, applying to a job, application history).
 *
 * A logged-out visitor is sent to login. A logged-in COMPANY or ADMIN
 * account is bounced to their own home instead of being allowed to poke
 * around seeker-only pages with someone else's session.
 */
export const seekerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const role = localStorage.getItem('role');

  if (role === 'JOBSEEKER') {
    return true;
  }

  if (role === 'COMPANY') {
    router.navigate(['/company/company-dashboard']);
  } else if (role === 'ADMIN') {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/auth/login']);
  }

  return false;
};
