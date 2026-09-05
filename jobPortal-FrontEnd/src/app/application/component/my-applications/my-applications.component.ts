import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/auth/Models/Application';
import { ApplicationService } from 'src/app/service/application/application.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

  allApplications: Application[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    const jobseekerId = Number(localStorage.getItem('id'));
    this.getAllApplicationsByJobseekerId(jobseekerId);
  }

  getAllApplicationsByJobseekerId(id: number): void {
    this.applicationService.getApplicationByjobSeekerId(id).subscribe({
      next: (result) => { this.allApplications = result; },
      error: (err) => { console.log(err); }
    });
  }
}
