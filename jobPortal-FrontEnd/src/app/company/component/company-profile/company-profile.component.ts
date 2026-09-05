import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/landing/models/company';
import { CompanyService } from 'src/app/service/company/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {

  company!: Company;

  constructor(private compService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanyById();
  }

  getCompanyById() {
    this.compService.getCompanyById(Number(localStorage.getItem('id')))
      .subscribe(res => this.company = res);
  }
}
