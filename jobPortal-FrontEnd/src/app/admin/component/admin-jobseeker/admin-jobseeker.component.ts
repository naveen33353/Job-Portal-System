import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jobSeeker } from 'src/app/auth/Models/jobSeeker';
import { Application } from 'src/app/auth/Models/Application';
import { ApplicationService } from 'src/app/service/application/application.service';
import { JobseekerService } from 'src/app/service/jobseeker/jobseeker.service';

interface JobSeekerDetail {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  joined: string;
  lastActive: string;
  profileCompletion: number;
  status: 'Active' | 'Suspended' | 'Reported';
  verifiedEmail: boolean;
  resumeOnFile: boolean;
  resumeUrl?: string;
  skills: string[];
  linkedin: string;
  portfolio: string;
  applications: Application[];
  savedJobs: string[];
  moderationLog: { date: string; event: string }[];
}

@Component({
  selector: 'app-admin-jobseeker',
  templateUrl: './admin-jobseeker.component.html',
  styleUrls: ['./admin-jobseeker.component.css']
})
export class AdminJobseekerComponent implements OnInit {

  seeker: JobSeekerDetail | null = null;
  applications: Application[] = [];

  private readonly seedSeeker: JobSeekerDetail = {
    id: 1,
    name: 'Aditi Menon',
    firstName: 'Aditi',
    lastName: 'Menon',
    email: 'aditi.menon@email.com',
    phone: '+91 98471 22***',
    location: 'Kochi, IN',
    headline: 'Backend Engineer · 3 yrs experience',
    joined: 'Feb 2024',
    lastActive: 'Today, 9:42 AM',
    profileCompletion: 92,
    status: 'Active',
    verifiedEmail: true,
    resumeOnFile: true,
    resumeUrl: '#',
    skills: ['Java', 'Spring Boot', 'React', 'SQL', 'PostgreSQL', 'Docker'],
    linkedin: 'linkedin.com/in/aditimenon',
    portfolio: 'aditi.dev',
    applications: [
      { id: 1, jobSeekerId: 1, jobSeekerName: 'Aditi Menon', jobId: 10, jobTitle: 'Backend Engineer',  companyName: 'Nimbus Cloud',    status: 'PENDING',   appliedDate: new Date('2026-06-23') },
      { id: 2, jobSeekerId: 1, jobSeekerName: 'Aditi Menon', jobId: 11, jobTitle: 'Product Designer', companyName: 'Fernwood Labs',   status: 'APPROVED',  appliedDate: new Date('2026-06-20') },
      { id: 3, jobSeekerId: 1, jobSeekerName: 'Aditi Menon', jobId: 12, jobTitle: 'Java Developer',   companyName: 'Solstice Retail', status: 'REJECTED',  appliedDate: new Date('2026-06-14') },
      { id: 4, jobSeekerId: 1, jobSeekerName: 'Aditi Menon', jobId: 13, jobTitle: 'Data Analyst',     companyName: 'Harbor & Finch',  status: 'APPROVED',  appliedDate: new Date('2026-06-02') },
      { id: 5, jobSeekerId: 1, jobSeekerName: 'Aditi Menon', jobId: 14, jobTitle: 'QA Engineer',      companyName: 'Nimbus Cloud',    status: 'CANCELED',  appliedDate: new Date('2026-05-18') }
    ],
    savedJobs: [
      'Senior Backend Engineer · Nimbus Cloud',
      'DevOps Engineer · Nimbus Cloud',
      'Java Developer · Solstice Retail'
    ],
    moderationLog: [
      { date: '10 Aug 2026', event: 'Email verified' },
      { date: '02 Jul 2026', event: 'Resume updated' },
      { date: '15 May 2026', event: 'Account created' }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobseekerService: JobseekerService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobseekerService.getJobSeekerById(id).subscribe({
      next: (res: jobSeeker) => {
        this.seeker = {
          ...this.seedSeeker,
          ...res,
          id,
          name: `${res.firstName} ${res.lastName}`.trim() || this.seedSeeker.name,
          resumeOnFile: !!res.resumeUrl,
          resumeUrl: res.resumeUrl
        } as JobSeekerDetail;
        this.applications = this.seeker.applications;
      },
      error: () => {
        this.seeker = this.seedSeeker;
        this.applications = this.seedSeeker.applications;
      }
    });
  }

  get initials(): string {
    if (!this.seeker) return '';
    return this.seeker.name
      .split(' ')
      .filter(Boolean)
      .map(p => p.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  formatDate(d: Date | string | undefined): string {
    if (!d) return '';
    const date = typeof d === 'string' ? new Date(d) : d;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  suspend():  void { if (this.seeker) this.seeker.status = 'Suspended'; }
  reinstate(): void { if (this.seeker) this.seeker.status = 'Active'; }

  message(): void {
    // Backend integration placeholder — opens a mailto draft.
    if (this.seeker) {
      window.location.href = `mailto:${this.seeker.email}?subject=Hello%20from%20HireHub%20Admin`;
    }
  }

  deleteAccount(): void {
    if (!this.seeker) return;
    if (!confirm(`Delete account for ${this.seeker.name}? This cannot be undone.`)) return;
    this.jobseekerService.deleteJobSeeker(this.seeker.id).subscribe({
      next: () => this.router.navigate(['/admin/jobseekers']),
      error: () => this.router.navigate(['/admin/jobseekers'])
    });
  }
}
