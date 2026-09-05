import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/landing/models/job';
import { JobService } from 'src/app/service/job/job.service';
import { ApplicationService } from 'src/app/service/application/application.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {

  job!: Job;
  note = '';
  submitting = false;
  errorMessage = '';

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getJobById(jobId).subscribe({
      next: (result) => { this.job = result; },
      error: (err) => { console.log(err); }
    });
  }

  submitApplication(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    const jobSeekerId = Number(localStorage.getItem('id'));

    this.submitting = true;
    this.errorMessage = '';

    this.applicationService.applyToJob(jobId, jobSeekerId, this.note).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigateByUrl('/application/jobseeker-applications');
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message ?? 'Could not submit your application. Please try again.';
        console.log(err);
      }
    });
  }
}
