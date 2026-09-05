import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jobSeeker } from 'src/app/auth/Models/jobSeeker';
import { JobseekerService } from 'src/app/service/jobseeker/jobseeker.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  jobSeeker!: jobSeeker;

  // Editable form fields, kept separate from the loaded model until saved.
  firstName = '';
  lastName = '';
  email = '';
  location = '';
  skillsText = '';

  saving = false;

  constructor(
    private jobSeekerService: JobseekerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJobSeekerById();
  }

  getJobSeekerById(): void {
    const id = Number(localStorage.getItem('id'));
    this.jobSeekerService.getJobSeekerById(id).subscribe({
      next: (result) => {
        this.jobSeeker = result;
        this.firstName = result.firstName || '';
        this.lastName = result.lastName || '';
        this.email = result.email || '';
        this.location = result.location || '';
        this.skillsText = (result.skills || []).join(', ');
      },
      error: (err) => { console.log(err); }
    });
  }

  save(): void {
    const id = Number(localStorage.getItem('id'));
    const updated: Partial<jobSeeker> = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      location: this.location,
      skills: this.skillsText
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
    };

    this.saving = true;
    this.jobSeekerService.updateJobSeeker(id, updated).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigateByUrl('/seeker/profile-jobseeker');
      },
      error: (err) => {
        this.saving = false;
        console.log(err);
        alert('Could not save changes. Please try again.');
      }
    });
  }
}
