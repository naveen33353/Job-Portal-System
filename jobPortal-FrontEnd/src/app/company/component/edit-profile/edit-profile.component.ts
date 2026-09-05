import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/landing/models/company';
import { CompanyService } from 'src/app/service/company/company.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  company!: Company;

  // Editable form fields, kept separate from the loaded model until saved.
  companyName = '';
  website = '';
  location = '';
  description = '';

  saving = false;

  constructor(
    private compService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCompanyById();
  }

  getCompanyById() {
    this.compService.getCompanyById(Number(localStorage.getItem('id')))
      .subscribe(res => {
        this.company = res;
        this.companyName = res.companyName || '';
        this.website = res.website || '';
        this.location = res.location || '';
        this.description = res.description || '';
      });
  }

  save(): void {
    const id = Number(localStorage.getItem('id'));
    const updated: Partial<Company> = {
      companyName: this.companyName,
      website: this.website,
      location: this.location,
      description: this.description
    };

    this.saving = true;
    this.compService.updateCompany(id, updated).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigateByUrl('/company/profile-company');
      },
      error: (err) => {
        this.saving = false;
        console.log(err);
        alert('Could not save changes. Please try again.');
      }
    });
  }
}
