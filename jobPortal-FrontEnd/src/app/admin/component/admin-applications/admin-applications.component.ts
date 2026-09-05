import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/auth/Models/Application';
import { ApplicationService } from 'src/app/service/application/application.service';

@Component({
  selector: 'app-admin-applications',
  templateUrl: './admin-applications.component.html',
  styleUrls: ['./admin-applications.component.css']
})
export class AdminApplicationsComponent implements OnInit {

  applications: Application[] = [];
  activeTab: 'ALL' | 'APPROVED' | 'PENDING' | 'REJECTED' = 'ALL';

  searchTerm = '';
  selected: Set<number> = new Set();

  /** Set when arriving from "Applicants" on a specific job (admin-jobs). Null = show every job. */
  jobIdFilter: number | null = null;
  jobTitleFilter = '';

  private readonly seed: Application[] = [
    { id: 1, jobSeekerId: 1, jobSeekerName: 'Aditi Menon',  jobId: 10, jobTitle: 'Backend Engineer',    companyName: 'Nimbus Cloud',    status: 'PENDING',  appliedDate: new Date('2026-06-23') },
    { id: 2, jobSeekerId: 2, jobSeekerName: 'Rohan Iyer',   jobId: 11, jobTitle: 'DevOps Engineer',     companyName: 'Nimbus Cloud',    status: 'APPROVED', appliedDate: new Date('2026-06-22') },
    { id: 3, jobSeekerId: 3, jobSeekerName: 'Meera Nair',   jobId: 12, jobTitle: 'Product Designer',    companyName: 'Fernwood Labs',   status: 'APPROVED', appliedDate: new Date('2026-06-18') },
    { id: 4, jobSeekerId: 4, jobSeekerName: 'Sam Thomas',   jobId: 13, jobTitle: 'Data Analyst',        companyName: 'Harbor & Finch',  status: 'REJECTED', appliedDate: new Date('2026-06-15') },
    { id: 5, jobSeekerId: 5, jobSeekerName: 'Priya Das',    jobId: 14, jobTitle: 'Support Lead',        companyName: 'Solstice Retail', status: 'APPROVED', appliedDate: new Date('2026-05-28') },
    { id: 6, jobSeekerId: 6, jobSeekerName: 'Vikram Rao',   jobId: 15, jobTitle: 'Java Developer',      companyName: 'Solstice Retail', status: 'PENDING',  appliedDate: new Date('2026-05-21') },
    { id: 7, jobSeekerId: 7, jobSeekerName: 'Anjali Pillai',jobId: 16, jobTitle: 'Frontend Engineer',   companyName: 'Kite Studio',     status: 'REJECTED', appliedDate: new Date('2026-05-12') }
  ];

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.queryParamMap.get('jobId');
    this.jobIdFilter = jobId ? Number(jobId) : null;
    this.load();
  }

  setTab(tab: 'ALL' | 'APPROVED' | 'PENDING' | 'REJECTED'): void {
    this.activeTab = tab;
  }

  clearJobFilter(): void {
    this.jobIdFilter = null;
    this.jobTitleFilter = '';
  }

  private load(): void {
    this.applicationService.getAllApplications().subscribe({
      next: (list) => {
        this.applications = list || [];
        if (this.applications.length === 0) this.applications = this.seed;
        this.syncJobTitleFilter();
      },
      error: () => {
        this.applications = this.seed;
        this.syncJobTitleFilter();
      }
    });
  }

  private syncJobTitleFilter(): void {
    if (this.jobIdFilter == null) return;
    const match = this.applications.find(a => a.jobId === this.jobIdFilter);
    this.jobTitleFilter = match ? match.jobTitle : '';
  }

  toggle(id: number): void {
    this.selected.has(id) ? this.selected.delete(id) : this.selected.add(id);
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.visibleRows.forEach(r => this.selected.add(r.id));
    } else {
      this.selected.clear();
    }
  }

  approve(app: Application): void { app.status = 'APPROVED'; }
  reject(app: Application):  void { app.status = 'REJECTED'; }
  deleteRow(app: Application): void {
    this.applications = this.applications.filter(a => a.id !== app.id);
    this.selected.delete(app.id);
  }

  bulkApprove(): void {
    this.applications.forEach(a => { if (this.selected.has(a.id)) a.status = 'APPROVED'; });
  }
  bulkReject(): void {
    this.applications.forEach(a => { if (this.selected.has(a.id)) a.status = 'REJECTED'; });
  }
  bulkDelete(): void {
    this.applications = this.applications.filter(a => !this.selected.has(a.id));
    this.selected.clear();
  }

  formatDate(d: Date | string | undefined): string {
    if (!d) return '';
    const date = typeof d === 'string' ? new Date(d) : d;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  get allCount():         number { return this.applications.length; }
  get approvedCount():    number { return this.applications.filter(a => a.status === 'APPROVED').length; }
  get pendingCount():     number { return this.applications.filter(a => a.status === 'PENDING').length; }
  get rejectedCount():    number { return this.applications.filter(a => a.status === 'REJECTED').length; }

  get visibleRows(): Application[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.applications.filter(a => {
      const matchesJob = this.jobIdFilter == null || a.jobId === this.jobIdFilter;
      const matchesTab = this.activeTab === 'ALL' || a.status === this.activeTab;
      const matchesTerm = !term
        || (a.jobSeekerName || '').toLowerCase().includes(term)
        || (a.jobTitle || '').toLowerCase().includes(term)
        || (a.companyName || '').toLowerCase().includes(term);
      return matchesJob && matchesTab && matchesTerm;
    });
  }
}
