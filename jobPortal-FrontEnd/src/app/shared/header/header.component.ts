import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CompanyService } from 'src/app/service/company/company.service';
import { JobseekerService } from 'src/app/service/jobseeker/jobseeker.service';

/**
 * Single reusable app header.
 *
 * variant:
 *  - 'guest'   : public pages (landing, jobs, companies, 404, public company profile).
 *                Shows login/signup, or the user's avatar if they happen to be logged in.
 *  - 'company' : authenticated company pages (dashboard, post job, manage jobs, applicants...).
 *  - 'seeker'  : authenticated job seeker pages (dashboard, etc).
 *
 * All the "who is logged in / what are their initials" logic that used to be
 * copy-pasted into every page component now lives here, once.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() variant: 'guest' | 'company' | 'seeker' | 'admin' = 'guest';

  isLoggedIn = false;
  initials = '';
  displayName = '';
  profileRoute = '/';

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private jobseekerService: JobseekerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.variant === 'admin') {
      // Admin identity comes from the real backend login (see admin.guard.ts,
      // which posts to auth/login and requires role === 'ADMIN').
      this.isLoggedIn = true;
      const adminEmail = localStorage.getItem('adminUsername') || 'admin@hirehub.io';
      this.displayName = adminEmail.split('@')[0];
      this.initials = this.toInitials(this.displayName) || 'AD';
      this.profileRoute = '/admin/profile';
      return;
    }

    if (this.variant === 'company') {
      this.isLoggedIn = true;
      this.profileRoute = '/company/company-dashboard';
      this.loadCompanyIdentity(Number(localStorage.getItem('id')));
      return;
    }

    if (this.variant === 'seeker') {
      this.isLoggedIn = true;
      this.profileRoute = '/seeker/jobseeker-dashboard';
      this.loadSeekerIdentity(Number(localStorage.getItem('id')));
      return;
    }

    // guest variant: might still be logged in (e.g. landing page, public company profile)
    this.isLoggedIn = this.authService.isLoggedIn();

    if (!this.isLoggedIn) {
      return;
    }

    const role = localStorage.getItem('role');
    const id = Number(localStorage.getItem('id'));

    if (role === 'COMPANY') {
      this.profileRoute = '/company/company-dashboard';
      this.loadCompanyIdentity(id);
    } else {
      this.profileRoute = '/seeker/jobseeker-dashboard';
      this.loadSeekerIdentity(id);
    }
  }

  private loadCompanyIdentity(id: number): void {
    this.companyService.getCompanyById(id).subscribe({
      next: (company) => {
        this.displayName = company?.companyName ?? '';
        this.initials = this.toInitials(this.displayName);
      },
      error: (err) => console.error(err)
    });
  }

  private loadSeekerIdentity(id: number): void {
    this.jobseekerService.getJobSeekerById(id).subscribe({
      next: (seeker) => {
        this.displayName = `${seeker?.firstName ?? ''} ${seeker?.lastName ?? ''}`.trim();
        this.initials = this.toInitials(this.displayName);
      },
      error: (err) => console.error(err)
    });
  }

  private toInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
