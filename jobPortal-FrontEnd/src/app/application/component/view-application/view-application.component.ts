import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationDetails } from 'src/app/auth/Models/ApplicationDetails';
import { ApplicationService } from 'src/app/service/application/application.service';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {

  application!: ApplicationDetails;

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const applicationId = Number(this.route.snapshot.paramMap.get('id'));
    this.getApplicationById(applicationId);
  }

  getApplicationById(id: number): void {
    this.applicationService.getApplicationById(id).subscribe({
      next: (result) => { this.application = result; },
      error: (err) => { console.log(err); }
    });
  }

  withdrawApplication(id: number | undefined): void {
    if (id == null) {
      return;
    }

    this.applicationService.deleteApplication(id).subscribe({
      next: () => { this.router.navigateByUrl('/application/jobseeker-applications'); },
      error: (err) => { console.log(err); }
    });
  }
}
