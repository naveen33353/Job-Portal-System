import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

/**
 * Guards routes that only make sense for a logged-in company account
 * (dashboard, post/manage jobs, review applicants, edit company profile).
 *
 * A logged-out visitor is sent to login. A logged-in JOBSEEKER or ADMIN
 * account is bounced to their own home instead of being allowed to poke
 * around company-only pages with someone else's session.
 */
export const companyGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const role = localStorage.getItem('role');

  if (role === 'COMPANY') {
    return true;
  }

  if (role === 'JOBSEEKER') {
    router.navigate(['/seeker/jobseeker-dashboard']);
  } else if (role === 'ADMIN') {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/auth/login']);
  }

  return false;
};
