import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/landing/models/job';
import { JobService } from 'src/app/service/job/job.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {

  savedJobs: Job[] = [];
  totalSavedJobs = 0;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    const jobSeekerId = Number(localStorage.getItem('id'));
    this.getAllSavedJobs(jobSeekerId);
  }

  getAllSavedJobs(jobSeekerId: number): void {
    this.jobService.getSavedJobs(jobSeekerId).subscribe({
      next: (result) => {
        this.savedJobs = result;
        this.totalSavedJobs = this.savedJobs.length;
      },
      error: (err) => { console.log(err); }
    });
  }

  removeSavedJob(jobId: string | number): void {
    const id = Number(jobId);
    const jobSeekerId = Number(localStorage.getItem('id'));

    this.jobService.removeSavedJob(id, jobSeekerId).subscribe({
      next: () => {
        this.savedJobs = this.savedJobs.filter(job => Number(job.jobId) !== id);
        this.totalSavedJobs = this.savedJobs.length;
      },
      error: (err) => { console.log(err); }
    });
  }
}
