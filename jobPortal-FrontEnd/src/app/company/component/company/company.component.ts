import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/landing/models/company';
import { Job } from 'src/app/landing/models/job';
import { CompanyService } from 'src/app/service/company/company.service';

/** Public company profile page (no login required). */
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyId!: number;
  company!: Company;
  jobs: Job[] = [];

  constructor(
    private compService: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.companyId = routeId ? Number(routeId) : Number(localStorage.getItem('id'));

    this.getCompanyById();
    this.getJobsByCompany();
  }

  getCompanyById() {
    this.compService.getCompanyById(this.companyId).subscribe(res => this.company = res);
  }

  getJobsByCompany() {
    this.compService.getJobsByCompany(this.companyId).subscribe(res => this.jobs = res);
  }
}
