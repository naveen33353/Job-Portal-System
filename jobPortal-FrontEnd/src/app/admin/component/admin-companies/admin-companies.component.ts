import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/landing/models/company';
import { CompanyService } from 'src/app/service/company/company.service';

interface AdminCompanyRow {
  companyId: number;
  companyName: string;
  email: string;
  location: string;
  joined: string;
  jobsPosted: number;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
}

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  companies: AdminCompanyRow[] = [];
  totalCompanies = 0;
  activeCount = 0;
  pendingCount = 0;
  suspendedCount = 0;

  searchTerm = '';
  selectedLocation = 'All locations';
  statusFilter: 'ALL' | 'ACTIVE' | 'PENDING' | 'SUSPENDED' = 'ALL';
  selected: Set<number> = new Set();

  private readonly seedRows: AdminCompanyRow[] = [
    { companyId: 1, companyName: 'Nimbus Cloud',     email: 'hr@nimbuscloud.io',       location: 'Kochi',     joined: 'Jan 2024', jobsPosted: 6,  status: 'ACTIVE' },
    { companyId: 2, companyName: 'Fernwood Labs',    email: 'team@fernwoodlabs.com',   location: 'Remote',    joined: 'Mar 2024', jobsPosted: 3,  status: 'ACTIVE' },
    { companyId: 3, companyName: 'Harbor & Finch',   email: 'jobs@harborfinch.com',    location: 'Bengaluru', joined: 'Jul 2023', jobsPosted: 11, status: 'ACTIVE' },
    { companyId: 4, companyName: 'Solstice Retail',  email: 'careers@solsticeretail.com', location: 'Mumbai', joined: 'Aug 2026', jobsPosted: 2,  status: 'PENDING' },
    { companyId: 5, companyName: 'Atlas Logistics',  email: 'hr@atlaslog.in',          location: 'Chennai',   joined: 'Feb 2025', jobsPosted: 4,  status: 'SUSPENDED' },
    { companyId: 6, companyName: 'Lumen Health',     email: 'people@lumenhealth.io',   location: 'Hyderabad', joined: 'Sep 2026', jobsPosted: 0,  status: 'PENDING' },
    { companyId: 7, companyName: 'Kite Studio',      email: 'studio@kitestudio.co',    location: 'Pune',      joined: 'Apr 2024', jobsPosted: 8,  status: 'ACTIVE' }
  ];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.companyService.getAllCompanies().subscribe({
      next: (list) => {
        this.companies = (list || []).map((c: Company, i) => ({
          companyId: c.companyId,
          companyName: c.companyName,
          email: `${c.companyName.toLowerCase().replace(/\s+/g, '')}@email.com`,
          location: c.location,
          joined: '2024',
          jobsPosted: c.jobs?.length || 0,
          status: c.active ? 'ACTIVE' : 'SUSPENDED'
        }));
        if (this.companies.length === 0) {
          this.companies = this.seedRows;
        }
        this.recomputeCounts();
      },
      error: () => {
        this.companies = this.seedRows;
        this.recomputeCounts();
      }
    });
  }

  private recomputeCounts(): void {
    this.totalCompanies = this.companies.length;
    this.activeCount = this.companies.filter(c => c.status === 'ACTIVE').length;
    this.pendingCount = this.companies.filter(c => c.status === 'PENDING').length;
    this.suspendedCount = this.companies.filter(c => c.status === 'SUSPENDED').length;
  }

  toggle(id: number): void {
    this.selected.has(id) ? this.selected.delete(id) : this.selected.add(id);
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.filteredRows.forEach(r => this.selected.add(r.companyId));
    } else {
      this.selected.clear();
    }
  }

  approve(row: AdminCompanyRow): void { row.status = 'ACTIVE'; this.recomputeCounts(); }
  suspend(row: AdminCompanyRow): void { row.status = 'SUSPENDED'; this.recomputeCounts(); }
  reinstate(row: AdminCompanyRow): void { row.status = 'ACTIVE'; this.recomputeCounts(); }
  reject(row: AdminCompanyRow): void { this.companies = this.companies.filter(c => c.companyId !== row.companyId); this.recomputeCounts(); }
  deleteRow(row: AdminCompanyRow): void { this.companies = this.companies.filter(c => c.companyId !== row.companyId); this.selected.delete(row.companyId); this.recomputeCounts(); }

  bulkApprove(): void {
    this.companies.forEach(c => {
      if (this.selected.has(c.companyId) && c.status === 'PENDING') c.status = 'ACTIVE';
    });
    this.recomputeCounts();
  }

  bulkSuspend(): void {
    this.companies.forEach(c => {
      if (this.selected.has(c.companyId) && c.status === 'ACTIVE') c.status = 'SUSPENDED';
    });
    this.recomputeCounts();
  }

  bulkDelete(): void {
    this.companies = this.companies.filter(c => !this.selected.has(c.companyId));
    this.selected.clear();
    this.recomputeCounts();
  }

  get filteredRows(): AdminCompanyRow[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.companies.filter(c => {
      const matchesTerm = !term
        || c.companyName.toLowerCase().includes(term)
        || c.email.toLowerCase().includes(term);
      const matchesLocation = this.selectedLocation === 'All locations' || c.location === this.selectedLocation;
      const matchesStatus = this.statusFilter === 'ALL' || c.status === this.statusFilter;
      return matchesTerm && matchesLocation && matchesStatus;
    });
  }

  setStatusFilter(status: 'ALL' | 'ACTIVE' | 'PENDING' | 'SUSPENDED'): void {
    this.statusFilter = status;
  }

  get locations(): string[] {
    const set = new Set(this.companies.map(c => c.location).filter(Boolean));
    return ['All locations', ...Array.from(set).sort()];
  }
}
