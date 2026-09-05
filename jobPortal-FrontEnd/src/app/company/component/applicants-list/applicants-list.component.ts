import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/auth/Models/Application';
import { Job } from 'src/app/landing/models/job';
import { ApplicationService } from 'src/app/service/application/application.service';
import { JobService } from 'src/app/service/job/job.service';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css']
})
export class ApplicantsListComponent implements OnInit {

  job!: Job;
  applicants: Application[] = [];

  constructor(
    private appService: ApplicationService,
    private jobService: JobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getApplicantsByJob();
    this.getJobById();
  }

  getApplicantsByJob() {
    this.appService.getApplicationByJob(Number(this.route.snapshot.paramMap.get('jobId')))
      .subscribe(res => this.applicants = res);
  }

  getJobById() {
    this.jobService.getJobById(Number(this.route.snapshot.paramMap.get('jobId')))
      .subscribe(res => this.job = res);
  }
}
