import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/auth/Models/Application';
import { ApplicationService } from 'src/app/service/application/application.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  applications: Application[] = [];

  constructor(private appService: ApplicationService) {}

  ngOnInit(): void {
    this.getApplicantsByCompany();
  }

  getApplicantsByCompany() {
    this.appService.getApplicantsByCompany(Number(localStorage.getItem('id')))
      .subscribe(res => this.applications = res);
  }
}
