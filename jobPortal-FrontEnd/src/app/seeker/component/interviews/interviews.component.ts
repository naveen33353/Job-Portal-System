import { Component, OnInit } from '@angular/core';
import { Interview } from 'src/app/auth/Models/Interview';
import { InterviewService } from 'src/app/service/interview/interview.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  id: number = Number(localStorage.getItem('id'));

  interviews: Interview[] = [];

  constructor(private interviewService: InterviewService) {}

  ngOnInit(): void {
    this.getInterviews();
  }

  getInterviews() {
    this.interviewService.getInterviewsByJobSeeker(this.id).subscribe({
      next: (res) => {
        this.interviews = (res || [])
          .slice()
          .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
      },
      error: (err) => console.log(err)
    });
  }

  statusChipClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'chip-completed';
      case 'CANCELLED': return 'chip-canceled';
      case 'RESCHEDULED': return 'chip-pending';
      default: return 'chip-open';
    }
  }
}
