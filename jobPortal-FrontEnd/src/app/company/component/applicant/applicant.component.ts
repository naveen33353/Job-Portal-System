import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationDetails } from 'src/app/auth/Models/ApplicationDetails';
import { Interview } from 'src/app/auth/Models/Interview';
import { InterviewRequest } from 'src/app/auth/Models/InterviewRequest';
import { ApplicationService } from 'src/app/service/application/application.service';
import { InterviewService } from 'src/app/service/interview/interview.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  app!: ApplicationDetails;

  constructor(
    private appService: ApplicationService,
    private interviewService: InterviewService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getApplicantById();
    this.getInterviews();
  }

  getApplicantById() {
    this.appService.getApplicationById(Number(this.route.snapshot.paramMap.get('appId')))
      .subscribe(res => this.app = res);
  }

  // ---- Interview scheduling ----

  interviews: Interview[] = [];
  showScheduleForm = false;
  scheduling = false;
  scheduleError = '';

  interviewForm = this.fb.group({
    scheduledAt: ['', Validators.required],
    mode: ['ONLINE', Validators.required],
    location: ['', Validators.required],
    interviewerName: ['', Validators.required],
    notes: ['']
  });

  getInterviews() {
    this.interviewService.getInterviewsByApplication(Number(this.route.snapshot.paramMap.get('appId')))
      .subscribe({
        next: (res) => this.interviews = res,
        error: (err) => console.log(err)
      });
  }

  toggleScheduleForm() {
    this.showScheduleForm = !this.showScheduleForm;
    this.scheduleError = '';
  }

  statusChipClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'chip-completed';
      case 'CANCELLED': return 'chip-canceled';
      case 'RESCHEDULED': return 'chip-pending';
      default: return 'chip-open';
    }
  }

  scheduleInterview() {
    this.scheduleError = '';

    if (this.interviewForm.invalid) {
      this.interviewForm.markAllAsTouched();
      this.scheduleError = 'Please fill all required fields.';
      return;
    }

    const dto: InterviewRequest = {
      applicationId: Number(this.route.snapshot.paramMap.get('appId')),
      scheduledAt: this.interviewForm.value.scheduledAt!,
      mode: this.interviewForm.value.mode as 'ONLINE' | 'OFFLINE',
      location: this.interviewForm.value.location!,
      interviewerName: this.interviewForm.value.interviewerName!,
      notes: this.interviewForm.value.notes || undefined
    };

    this.scheduling = true;

    this.interviewService.scheduleInterview(dto).subscribe({
      next: () => {
        this.scheduling = false;
        this.showScheduleForm = false;
        this.interviewForm.reset({ mode: 'ONLINE' });
        this.getInterviews();
        alert('Interview scheduled. The candidate has been notified by email.');
      },
      error: (err) => {
        this.scheduling = false;
        this.scheduleError = err.error?.message ?? 'Could not schedule the interview.';
      }
    });
  }
}

