import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Company } from 'src/app/landing/models/company';
import { jobSeeker } from 'src/app/auth/Models/jobSeeker';

export type UserRole = 'COMPANY' | 'JOBSEEKER' | null;

const STORAGE_KEYS = {
  token: 'token',
  role: 'role',
  id: 'id'
} as const;

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(this.readIsLoggedIn());
  private readonly roleSubject = new BehaviorSubject<UserRole>(this.readRole());

  constructor(private readonly router: Router) {}

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get role$(): Observable<UserRole> {
    return this.roleSubject.asObservable();
  }

  get role(): UserRole {
    return this.roleSubject.value;
  }

  get id(): number | null {
    const raw = localStorage.getItem(STORAGE_KEYS.id);
    return raw ? Number(raw) : null;
  }

  get token(): string | null {
    return localStorage.getItem(STORAGE_KEYS.token);
  }

  get profileRoute$(): Observable<string> {
    return of(this.role === 'COMPANY' ? '/company-dashboard' : '/jobseeker-dashboard');
  }

  get profileRoute(): string {
    return this.role === 'COMPANY' ? '/company-dashboard' : '/jobseeker-dashboard';
  }

  initialsFromCompany(company: Company | null | undefined): string {
    if (!company?.companyName) {
      return '';
    }
    return company.companyName
      .split(' ')
      .map((part: string) => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  initialsFromSeeker(seeker: jobSeeker | null | undefined): string {
    if (!seeker) {
      return '';
    }
    const name = (seeker.firstName ?? '') + ' ' + (seeker.lastName ?? '');
    return this.initialsFromString(name);
  }

  initialsFromString(fullName: string | null | undefined): string {
    if (!fullName) {
      return '';
    }
    return fullName
      .split(' ')
      .filter((part: string) => part.length > 0)
      .map((part: string) => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  refresh(): void {
    this.isLoggedInSubject.next(this.readIsLoggedIn());
    this.roleSubject.next(this.readRole());
  }

  logout(): void {
    localStorage.clear();
    this.refresh();
    this.router.navigate(['/']);
  }

  private readIsLoggedIn(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.token);
  }

  private readRole(): UserRole {
    const raw = localStorage.getItem(STORAGE_KEYS.role);
    return raw === 'COMPANY' || raw === 'JOBSEEKER' ? raw : null;
  }
}
