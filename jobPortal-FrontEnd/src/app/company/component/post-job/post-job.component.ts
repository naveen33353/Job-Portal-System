import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JobPostDTO } from 'src/app/auth/Models/JobPost';
import { Company } from 'src/app/landing/models/company';
import { CompanyService } from 'src/app/service/company/company.service';
import { JobService } from 'src/app/service/job/job.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  company!: Company;

  constructor(
    private compService: CompanyService,
    private jobService: JobService,
    private fb: FormBuilder
  ) {}

  postForm = this.fb.group({
    jobTitle: ['', Validators.required],
    description: ['', Validators.required],
    experience: ['', Validators.required],
    salary: ['', Validators.required],
    endDate: ['', Validators.required],
    skills: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getCompanyById();
  }

  getCompanyById() {
    this.compService.getCompanyById(Number(localStorage.getItem('id')))
      .subscribe(res => this.company = res);
  }

  submit(): void {

    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const job: JobPostDTO = {
      companyId: Number(localStorage.getItem('id')),
      jobTitle: this.postForm.value.jobTitle!,
      description: this.postForm.value.description!,
      experience: this.postForm.value.experience!,
      salary: this.postForm.value.salary!,
      endDate: this.postForm.value.endDate!,
      skills: this.postForm.value.skills!
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
    };

    this.jobService.postJob(job).subscribe({
      next: (res) => {
        alert('Job posted successfully');
        this.postForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert(err.error?.message ?? 'Something went wrong.');
      }
    });
  }
}
