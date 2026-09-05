import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/landing/models/job';
import { JobService } from 'src/app/service/job/job.service';

interface AdminJobRow {
  jobId: string;
  jobTitle: string;
  companyName: string;
  postedAgo: string;
  applicantCount: number;
  status: 'OPEN' | 'CLOSED' | 'FLAGGED';
  jobType: string;
}

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  jobs: AdminJobRow[] = [];
  totalJobs = 0;
  openCount = 0;
  closedCount = 0;
  flaggedCount = 0;

  searchTerm = '';
  selectedCategory = 'All categories';
  statusFilter: 'ALL' | 'OPEN' | 'CLOSED' | 'FLAGGED' = 'ALL';
  selected: Set<string> = new Set();

  private readonly seedRows: AdminJobRow[] = [
    { jobId: '1',  jobTitle: 'Senior Backend Engineer', companyName: 'Nimbus Cloud',    postedAgo: '3 days ago',  applicantCount: 31, status: 'OPEN',    jobType: 'Full-time' },
    { jobId: '2',  jobTitle: 'Product Designer',       companyName: 'Fernwood Labs',   postedAgo: '1 week ago',  applicantCount: 19, status: 'OPEN',    jobType: 'Full-time' },
    { jobId: '3',  jobTitle: 'Support Engineer',       companyName: 'Nimbus Cloud',    postedAgo: '3 weeks ago', applicantCount: 64, status: 'CLOSED',  jobType: 'Contract' },
    { jobId: '4',  jobTitle: 'DevOps Engineer',        companyName: 'Nimbus Cloud',    postedAgo: '2 days ago',  applicantCount: 12, status: 'OPEN',    jobType: 'Full-time' },
    { jobId: '5',  jobTitle: 'Data Analyst',           companyName: 'Harbor & Finch',  postedAgo: '5 days ago',  applicantCount: 27, status: 'OPEN',    jobType: 'Full-time' },
    { jobId: '6',  jobTitle: 'Customer Support Lead',  companyName: 'Solstice Retail', postedAgo: '4 days ago',  applicantCount: 8,  status: 'FLAGGED', jobType: 'Part-time' },
    { jobId: '7',  jobTitle: 'Frontend Engineer',      companyName: 'Kite Studio',     postedAgo: '6 days ago',  applicantCount: 22, status: 'OPEN',    jobType: 'Remote' },
    { jobId: '8',  jobTitle: 'QA Engineer',            companyName: 'Fernwood Labs',   postedAgo: '2 weeks ago', applicantCount: 15, status: 'CLOSED',  jobType: 'Internship' }
  ];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.jobService.getAllJobs().subscribe({
      next: (list) => {
        this.jobs = (list || []).map((j: Job) => ({
          jobId: j.jobId,
          jobTitle: j.jobTitle,
          companyName: j.companyName,
          postedAgo: this.toAgo(j.postedDate),
          applicantCount: j.applicantCount || 0,
          status: j.active ? 'OPEN' : 'CLOSED',
          jobType: j.jobType || 'Full-time'
        }));
        if (this.jobs.length === 0) {
          this.jobs = this.seedRows;
        }
        this.recomputeCounts();
      },
      error: () => {
        this.jobs = this.seedRows;
        this.recomputeCounts();
      }
    });
  }

  private toAgo(date: Date | string | undefined): string {
    if (!date) return 'recently';
    const d = typeof date === 'string' ? new Date(date) : date;
    const days = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 1) return 'today';
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
  }

  private recomputeCounts(): void {
    this.totalJobs = this.jobs.length;
    this.openCount = this.jobs.filter(j => j.status === 'OPEN').length;
    this.closedCount = this.jobs.filter(j => j.status === 'CLOSED').length;
    this.flaggedCount = this.jobs.filter(j => j.status === 'FLAGGED').length;
  }

  toggle(id: string): void {
    this.selected.has(id) ? this.selected.delete(id) : this.selected.add(id);
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.filteredRows.forEach(r => this.selected.add(r.jobId));
    } else {
      this.selected.clear();
    }
  }

  close(row: AdminJobRow):   void { row.status = 'CLOSED';  this.recomputeCounts(); }
  reopen(row: AdminJobRow):  void { row.status = 'OPEN';    this.recomputeCounts(); }
  approve(row: AdminJobRow): void { row.status = 'OPEN';    this.recomputeCounts(); }
  deleteRow(row: AdminJobRow): void { this.jobs = this.jobs.filter(j => j.jobId !== row.jobId); this.selected.delete(row.jobId); this.recomputeCounts(); }

  bulkClose():  void { this.jobs.forEach(j => { if (this.selected.has(j.jobId) && j.status === 'OPEN') j.status = 'CLOSED'; }); this.recomputeCounts(); }
  bulkReopen(): void { this.jobs.forEach(j => { if (this.selected.has(j.jobId) && j.status === 'CLOSED') j.status = 'OPEN'; }); this.recomputeCounts(); }
  bulkDelete(): void { this.jobs = this.jobs.filter(j => !this.selected.has(j.jobId)); this.selected.clear(); this.recomputeCounts(); }

  setStatusFilter(status: 'ALL' | 'OPEN' | 'CLOSED' | 'FLAGGED'): void {
    this.statusFilter = status;
  }

  get jobTypes(): string[] {
    const set = new Set(this.jobs.map(j => j.jobType).filter(Boolean));
    return ['All categories', ...Array.from(set).sort()];
  }

  get filteredRows(): AdminJobRow[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.jobs.filter(j => {
      const matchesTerm = !term
        || j.jobTitle.toLowerCase().includes(term)
        || j.companyName.toLowerCase().includes(term);
      const matchesCategory = this.selectedCategory === 'All categories' || j.jobType === this.selectedCategory;
      const matchesStatus = this.statusFilter === 'ALL' || j.status === this.statusFilter;
      return matchesTerm && matchesCategory && matchesStatus;
    });
  }
}
