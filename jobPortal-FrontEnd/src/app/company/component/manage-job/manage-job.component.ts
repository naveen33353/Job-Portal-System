import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/landing/models/job';
import { CompanyService } from 'src/app/service/company/company.service';
import { JobService } from 'src/app/service/job/job.service';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.css']
})
export class ManageJobComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private compService: CompanyService,
    private jobService : JobService
  ) {}

  ngOnInit(): void {
    this.getJobsByCompany();
  }

  getJobsByCompany() {
    this.compService.getJobsByCompany(Number(localStorage.getItem('id')))
      .subscribe(res => this.jobs = res);
  }
 deleteJob(id: string) {
  const jobId = Number(id);

  this.jobService.deleteJob(jobId).subscribe({
    next: () => {
      this.jobs = this.jobs.filter(j => Number(j.jobId) !== jobId);
    },
    error: err => console.error(err)
  });
}
}
