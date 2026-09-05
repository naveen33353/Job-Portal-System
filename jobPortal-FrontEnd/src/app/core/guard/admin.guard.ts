import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';

const ADMIN_ROLE = 'ADMIN';

/**
 * Gates the /admin area behind a real backend login.
 *
 * Prompts for email + password (same shape as the normal login form) and
 * posts them to POST auth/login, exactly like the company/job-seeker login
 * flow. Access is only granted if the backend both accepts the credentials
 * AND returns role === 'ADMIN' — a valid company/job-seeker login will be
 * rejected here even though it's a "real" account.
 */
export const adminGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const alreadyAuthenticated =
    localStorage.getItem('role') === ADMIN_ROLE && !!localStorage.getItem('token');

  if (alreadyAuthenticated) {
    return of(true);
  }

  const email = window.prompt('Admin login\n\nEmail:');
  if (email === null) {
    router.navigate(['/']);
    return of(false);
  }

  const password = window.prompt('Admin login\n\nPassword:');
  if (password === null) {
    router.navigate(['/']);
    return of(false);
  }

  return authService.login({ email, password }).pipe(
    map((res: any) => {
      if (res?.role !== ADMIN_ROLE) {
        alert('This account is not an admin account.');
        router.navigate(['/']);
        return false;
      }

      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('id', res.id);
      localStorage.setItem('adminUsername', email);
      return true;
    }),
    catchError((err) => {
      alert(err?.error?.message ?? 'Invalid admin email or password.');
      router.navigate(['/']);
      return of(false);
    })
  );
};
