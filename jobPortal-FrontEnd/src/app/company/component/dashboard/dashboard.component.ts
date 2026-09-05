import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/auth/Models/Application';
import { Company } from 'src/app/landing/models/company';
import { Job } from 'src/app/landing/models/job';
import { ApplicationService } from 'src/app/service/application/application.service';
import { CompanyService } from 'src/app/service/company/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  company!: Company;
  jobs: Job[] = [];
  applications: Application[] = [];
  pendingApplications: Application[] = [];
  approvedAppplications: Application[] = [];

  constructor(private compService: CompanyService, private appService: ApplicationService) {}

  ngOnInit(): void {
    this.getCompanyById();
    this.getJobsByCompany();
    this.getApplicantsByCompany();
    this.getPendingApplications();
    this.getHiredApplicants();
  }

  getCompanyById() {
    this.compService.getCompanyById(Number(localStorage.getItem('id')))
      .subscribe(res => this.company = res);
  }

  getJobsByCompany() {
    this.compService.getJobsByCompany(Number(localStorage.getItem('id')))
      .subscribe(res => this.jobs = res);
  }

  getApplicantsByCompany() {
    this.appService.getApplicantsByCompany(Number(localStorage.getItem('id')))
      .subscribe(res => this.applications = res);
  }

  getPendingApplications() {
    this.appService.getPendindApplicants(Number(localStorage.getItem('id')))
      .subscribe(res => this.pendingApplications = res);
  }

  getHiredApplicants() {
    this.appService.getHiredApplicants(Number(localStorage.getItem('id')))
      .subscribe(res => this.approvedAppplications = res);
  }
}
