import { Component, OnInit } from '@angular/core';
import { JobseekerService } from 'src/app/service/jobseeker/jobseeker.service';

/**
 * Row shape used by the admin job-seekers table. Only the display fields the
 * table actually renders are kept here (mirrors the AdminCompanyRow pattern
 * in admin-companies) -- the backend's jobSeeker model carries extra fields
 * (like password) that the admin view has no business holding onto.
 */
interface AdminSeekerRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  joined: string;
  applications: number;
  status: 'ACTIVE' | 'SUSPENDED' | 'REPORTED';
}

@Component({
  selector: 'app-admin-jobseekers',
  templateUrl: './admin-jobseekers.component.html',
  styleUrls: ['./admin-jobseekers.component.css']
})
export class AdminJobseekersComponent implements OnInit {

  seekers: AdminSeekerRow[] = [];
  totalSeekers = 0;
  activeSeekers = 0;
  dormantSeekers = 0;
  suspendedSeekers = 0;
  reportedSeekers = 0;

  searchTerm = '';
  selectedLocation = 'All locations';
  statusFilter: 'ALL' | 'ACTIVE' | 'SUSPENDED' | 'REPORTED' = 'ALL';

  selected: Set<number> = new Set();

  private readonly seedRows: AdminSeekerRow[] = [
    { id: 1, firstName: 'Aditi',   lastName: 'Menon',  email: 'aditi.menon@email.com',   location: 'Kochi',     joined: 'Feb 2024', applications: 14, status: 'ACTIVE' },
    { id: 2, firstName: 'Rohan',   lastName: 'Iyer',   email: 'rohan.iyer@email.com',    location: 'Bengaluru', joined: 'May 2024', applications: 6,  status: 'ACTIVE' },
    { id: 3, firstName: 'Meera',   lastName: 'Nair',   email: 'meera.nair@email.com',    location: 'Chennai',   joined: 'Aug 2023', applications: 22, status: 'ACTIVE' },
    { id: 4, firstName: 'Sam',     lastName: 'Thomas', email: 'sam.thomas@email.com',    location: 'Hyderabad', joined: 'Mar 2025', applications: 9,  status: 'ACTIVE' },
    { id: 5, firstName: 'Priya',   lastName: 'Das',    email: 'priya.das@email.com',     location: 'Pune',      joined: 'Jun 2024', applications: 3,  status: 'SUSPENDED' },
    { id: 6, firstName: 'Vikram',  lastName: 'Rao',    email: 'vikram.rao@email.com',    location: 'Mumbai',    joined: 'Jan 2026', applications: 11, status: 'ACTIVE' },
    { id: 7, firstName: 'Anjali',  lastName: 'Pillai', email: 'anjali.pillai@email.com', location: 'Remote',    joined: 'Oct 2023', applications: 18, status: 'REPORTED' },
    { id: 8, firstName: 'Karthik', lastName: 'Bhat',   email: 'karthik.bhat@email.com',  location: 'Kochi',     joined: 'Nov 2024', applications: 5,  status: 'ACTIVE' }
  ];

  constructor(private jobseekerService: JobseekerService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.jobseekerService.getAllJobSeekers().subscribe({
      next: (list) => {
        this.seekers = (list || []).map((s, i) => ({
          id: i + 1,
          firstName: s.firstName,
          lastName: s.lastName,
          email: s.email,
          location: s.location,
          joined: '2024',
          applications: 0,
          status: 'ACTIVE'
        }));
        if (this.seekers.length === 0) {
          this.seekers = this.seedRows;
        }
        this.recomputeCounts();
      },
      error: () => {
        this.seekers = this.seedRows;
        this.recomputeCounts();
      }
    });
  }

  private recomputeCounts(): void {
    this.totalSeekers = this.seekers.length;
    this.activeSeekers = this.seekers.filter(s => s.status === 'ACTIVE').length;
    this.suspendedSeekers = this.seekers.filter(s => s.status === 'SUSPENDED').length;
    this.reportedSeekers = this.seekers.filter(s => s.status === 'REPORTED').length;
    this.dormantSeekers = Math.max(0, this.totalSeekers - this.activeSeekers - this.suspendedSeekers - this.reportedSeekers);
  }

  toggle(id: number): void {
    this.selected.has(id) ? this.selected.delete(id) : this.selected.add(id);
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.filteredRows.forEach(r => this.selected.add(r.id));
    } else {
      this.selected.clear();
    }
  }

  suspend(row: AdminSeekerRow): void {
    row.status = 'SUSPENDED';
    this.recomputeCounts();
  }

  reinstate(row: AdminSeekerRow): void {
    row.status = 'ACTIVE';
    this.recomputeCounts();
  }

  resolveReport(row: AdminSeekerRow): void {
    row.status = 'ACTIVE';
    this.recomputeCounts();
  }

  deleteRow(row: AdminSeekerRow): void {
    this.seekers = this.seekers.filter(s => s.id !== row.id);
    this.selected.delete(row.id);
    this.recomputeCounts();
  }

  bulkSuspend(): void {
    this.seekers.forEach(s => {
      if (this.selected.has(s.id) && s.status === 'ACTIVE') {
        s.status = 'SUSPENDED';
      }
    });
    this.recomputeCounts();
  }

  bulkDelete(): void {
    this.seekers = this.seekers.filter(s => !this.selected.has(s.id));
    this.selected.clear();
    this.recomputeCounts();
  }

  bulkEmail(): void {
    // Email is wired through a backend; this is a UI-only placeholder.
    alert(`Email queued for ${this.selected.size} seekers.`);
    this.selected.clear();
  }

  setStatusFilter(status: 'ALL' | 'ACTIVE' | 'SUSPENDED' | 'REPORTED'): void {
    this.statusFilter = status;
  }

  get locations(): string[] {
    const set = new Set(this.seekers.map(s => s.location).filter(Boolean));
    return ['All locations', ...Array.from(set).sort()];
  }

  get filteredRows(): AdminSeekerRow[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.seekers.filter(s => {
      const matchesTerm = !term
        || `${s.firstName} ${s.lastName}`.toLowerCase().includes(term)
        || (s.email || '').toLowerCase().includes(term);
      const matchesLocation = this.selectedLocation === 'All locations' || s.location === this.selectedLocation;
      const matchesStatus = this.statusFilter === 'ALL' || s.status === this.statusFilter;
      return matchesTerm && matchesLocation && matchesStatus;
    });
  }
}
