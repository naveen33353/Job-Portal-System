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
  activeTab: 'ALL' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' = 'ALL';

  constructor(private interviewService: InterviewService) {}

  ngOnInit(): void {
    this.getInterviews();
  }

  getInterviews() {
    this.interviewService.getInterviewsByCompany(this.id).subscribe({
      next: (res) => this.interviews = res,
      error: (err) => console.log(err)
    });
  }

  setTab(tab: 'ALL' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED') {
    this.activeTab = tab;
  }

  get filteredInterviews(): Interview[] {
    if (this.activeTab === 'ALL') return this.interviews;
    if (this.activeTab === 'SCHEDULED') {
      return this.interviews.filter(i => i.status === 'SCHEDULED' || i.status === 'RESCHEDULED');
    }
    return this.interviews.filter(i => i.status === this.activeTab);
  }

  statusChipClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'chip-completed';
      case 'CANCELLED': return 'chip-canceled';
      case 'RESCHEDULED': return 'chip-pending';
      default: return 'chip-open';
    }
  }

  cancelInterview(id: number) {
    if (!confirm('Cancel this interview?')) return;

    this.interviewService.cancelInterview(id).subscribe({
      next: () => this.getInterviews(),
      error: (err) => console.log(err)
    });
  }
}
