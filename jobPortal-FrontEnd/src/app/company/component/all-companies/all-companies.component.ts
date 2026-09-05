import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/landing/models/company';
import { CompanyService } from 'src/app/service/company/company.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit {

  companies: Company[] = [];
  searchTerm = '';

  constructor(private compService: CompanyService) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies(): void {
    this.compService.getAllCompanies().subscribe(res => this.companies = res || []);
  }

  get filteredCompanies(): Company[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.companies;
    return this.companies.filter(c =>
      (c.companyName || '').toLowerCase().includes(term)
      || (c.location || '').toLowerCase().includes(term)
      || (c.industry || '').toLowerCase().includes(term)
    );
  }
}
