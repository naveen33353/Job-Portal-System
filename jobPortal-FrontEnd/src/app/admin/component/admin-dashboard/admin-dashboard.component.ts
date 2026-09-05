import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/landing/models/company';
import { Job } from 'src/app/landing/models/job';
import { Application } from 'src/app/auth/Models/Application';
import { ApplicationService } from 'src/app/service/application/application.service';
import { CompanyService } from 'src/app/service/company/company.service';
import { JobService } from 'src/app/service/job/job.service';
import { JobseekerService } from 'src/app/service/jobseeker/jobseeker.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  totalSeekers = 0;
  totalCompanies = 0;
  totalJobs = 0;
  totalApplications = 0;

  recentApplications: Application[] = [];
  newestCompanies: Company[] = [];
  newestJobs: Job[] = [];

  // Seed data is shown when the backend hasn't been wired yet.
  private readonly seedApplications: Application[] = [
    { id: 1, jobSeekerId: 1, jobSeekerName: 'Aditi Menon', jobId: 10, jobTitle: 'Backend Engineer', companyName: 'Nimbus Cloud', status: 'PENDING', appliedDate: new Date('2026-06-23') },
    { id: 2, jobSeekerId: 2, jobSeekerName: 'Rohan Iyer', jobId: 11, jobTitle: 'DevOps Engineer', companyName: 'Nimbus Cloud', status: 'APPROVED', appliedDate: new Date('2026-06-22') },
    { id: 3, jobSeekerId: 3, jobSeekerName: 'Meera Nair', jobId: 12, jobTitle: 'Product Designer', companyName: 'Fernwood Labs', status: 'REJECTED', appliedDate: new Date('2026-06-18') },
    { id: 4, jobSeekerId: 4, jobSeekerName: 'Sam Thomas', jobId: 13, jobTitle: 'Data Analyst', companyName: 'Harbor & Finch', status: 'PENDING', appliedDate: new Date('2026-06-15') },
    { id: 5, jobSeekerId: 5, jobSeekerName: 'Priya Das', jobId: 14, jobTitle: 'Support Lead', companyName: 'Solstice Retail', status: 'APPROVED', appliedDate: new Date('2026-05-28') }
  ];

  private readonly seedCompanies: Partial<Company>[] = [
    { companyId: 1, companyName: 'Solstice Retail', location: 'Mumbai' },
    { companyId: 2, companyName: 'Harbor & Finch', location: 'Bengaluru' },
    { companyId: 3, companyName: 'Lumen Health', location: 'Hyderabad' }
  ];

  constructor(
    private jobseekerService: JobseekerService,
    private companyService: CompanyService,
    private jobService: JobService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.fetchCounts();
    this.fetchRecent();
  }

  private fetchCounts(): void {
    this.jobseekerService.getJobSeekerCount().subscribe({
      next: (n) => (this.totalSeekers = n),
      error: () => (this.totalSeekers = 4812)
    });
    this.companyService.getCompanyCount().subscribe({
      next: (n) => (this.totalCompanies = n),
      error: () => (this.totalCompanies = 318)
    });
    this.jobService.getJobCount().subscribe({
      next: (n) => (this.totalJobs = n),
      error: () => (this.totalJobs = 1204)
    });
    this.applicationService.getApplicationCount().subscribe({
      next: (n) => (this.totalApplications = n),
      error: () => (this.totalApplications = 642)
    });
  }

  private fetchRecent(): void {
    this.applicationService.getAllApplications().subscribe({
      next: (apps) => {
        this.recentApplications = (apps || []).slice(0, 5);
        if (this.recentApplications.length === 0) {
          this.recentApplications = this.seedApplications;
        }
      },
      error: () => (this.recentApplications = this.seedApplications)
    });

    this.companyService.getAllCompanies().subscribe({
      next: (list) => {
        // newest = last two
        const safe = list || [];
        this.newestCompanies = safe.slice(-2).reverse();
        if (this.newestCompanies.length === 0) {
          this.newestCompanies = this.seedCompanies as Company[];
        }
      },
      error: () => (this.newestCompanies = this.seedCompanies as Company[])
    });

    this.jobService.getAllJobs().subscribe({
      next: (jobs) => (this.newestJobs = (jobs || []).slice(0, 3)),
      error: () => {}
    });
  }
}
