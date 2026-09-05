import { Component, OnInit } from '@angular/core';
import { jobSeeker } from 'src/app/auth/Models/jobSeeker';
import { Application } from 'src/app/auth/Models/Application';
import { Job } from 'src/app/landing/models/job';
import { ApplicationService } from 'src/app/service/application/application.service';
import { JobseekerService } from 'src/app/service/jobseeker/jobseeker.service';
import { JobService } from 'src/app/service/job/job.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private jobseekerService: JobseekerService,
    private applicationService: ApplicationService,
    private jobService: JobService
  ) {}

  id: number = Number(localStorage.getItem('id'));

  seeker!: jobSeeker;
  applicationsById: Application[] = [];
  totalApplications = 0;
  pendingCount = 0;
  approvedCount = 0;
  savedJobsCount = 0;

  recommendedJobs: Job[] = [];

  ngOnInit(): void {
    this.getSeekerById(this.id);
    this.getApplicationsByJobseekerId(this.id);
    this.getSavedJobsCount(this.id);
    this.getRecommendedJobs();
  }

  getSeekerById(id: number): void {
    this.jobseekerService.getJobSeekerById(id).subscribe({
      next: (res) => this.seeker = res,
      error: (err) => console.log(err)
    });
  }

  getApplicationsByJobseekerId(id: number): void {
    this.applicationService.getApplicationByjobSeekerId(id).subscribe({
      next: (result) => {
        this.applicationsById = (result || [])
          .slice()
          .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
        this.totalApplications = this.applicationsById.length;
        this.pendingCount = this.applicationsById.filter(a => a.status === 'PENDING').length;
        this.approvedCount = this.applicationsById.filter(a => a.status === 'APPROVED').length;
      },
      error: (err) => console.log(err)
    });
  }

  getSavedJobsCount(id: number): void {
    this.jobService.getSavedJobs(id).subscribe({
      next: (jobs) => this.savedJobsCount = (jobs || []).length,
      error: (err) => console.log(err)
    });
  }

  getRecommendedJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        const mySkills = new Set((this.seeker?.skills || []).map(s => s.toLowerCase()));
        const open = (jobs || []).filter(j => j.active);
        const matched = mySkills.size
          ? open.filter(j => (j.skills || []).some(s => mySkills.has(s.toLowerCase())))
          : [];
        this.recommendedJobs = (matched.length ? matched : open).slice(0, 4);
      },
      error: (err) => console.log(err)
    });
  }

  get recentApplications(): Application[] {
    return this.applicationsById.slice(0, 5);
  }

  statusChipClass(status: string): string {
    switch (status) {
      case 'APPROVED': return 'chip-approved';
      case 'REJECTED': return 'chip-rejected';
      default: return 'chip-pending';
    }
  }
}
