import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/landing/models/job';
import { JobService } from 'src/app/service/job/job.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  job!: Job;
  isJobSaved = false;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.getJobById(jobId);

    if (this.authService.isLoggedIn() && localStorage.getItem('role') !== 'COMPANY') {
      const jobSeekerId = Number(localStorage.getItem('id'));
      this.jobService.getSavedJobs(jobSeekerId).subscribe({
        next: (jobs: Job[]) => {
          this.isJobSaved = jobs.some(job => Number(job.jobId) === jobId);
        },
        error: (err) => console.error(err)
      });
    }
  }

  getJobById(id: number): void {
    this.jobService.getJobById(id).subscribe({
      next: (result) => { this.job = result; },
      error: (err) => { console.log(err); }
    });
  }

  saveJobToProfile(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    const jobSeekerId = Number(localStorage.getItem('id'));

    this.jobService.saveJobToProfile(jobId, jobSeekerId).subscribe({
      next: () => { this.isJobSaved = true; },
      error: (err) => { console.log(err); }
    });
  }
}
