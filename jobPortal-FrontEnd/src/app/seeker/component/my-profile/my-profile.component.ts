import { Component, OnInit } from '@angular/core';
import { jobSeeker } from 'src/app/auth/Models/jobSeeker';
import { JobseekerService } from 'src/app/service/jobseeker/jobseeker.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  jobSeeker!: jobSeeker;

  constructor(private jobSeekerService: JobseekerService) {}

  ngOnInit(): void {
    this.getJobSeekerById();
  }

  get initials(): string {
    const name = `${this.jobSeeker?.firstName ?? ''} ${this.jobSeeker?.lastName ?? ''}`.trim();
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getJobSeekerById(): void {
    const id = Number(localStorage.getItem('id'));
    this.jobSeekerService.getJobSeekerById(id).subscribe({
      next: (result) => { this.jobSeeker = result; },
      error: (err) => { console.log(err); }
    });
  }
}
