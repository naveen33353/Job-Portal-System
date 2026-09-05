import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/service/job/job.service';
import { Job } from '../../models/job';
import { Company } from 'src/app/landing/models/company';
import { CompanyService } from 'src/app/service/company/company.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private jobService: JobService,
    private compService: CompanyService,
    private router: Router
  ) {}

  jobs: Job[] = [];
  companies: Company[] = [];
  heroSearchTerm = '';

  ngOnInit() {
    this.getAllJobs();
    this.getAllCompanies();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe((res) => {
      this.jobs = res;
    });
  }

  getAllCompanies() {
    this.compService.getAllCompanies().subscribe((res) => {
      this.companies = res;
    });
  }

  searchJobs(): void {
    const q = this.heroSearchTerm.trim();
    this.router.navigate(['/job/all-jobs'], q ? { queryParams: { q } } : {});
  }

  searchTag(tag: string): void {
    this.router.navigate(['/job/all-jobs'], { queryParams: { q: tag } });
  }
}
