import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jobSeeker } from 'src/app/auth/Models/jobSeeker';
import { JobseekerService } from 'src/app/service/jobseeker/jobseeker.service';
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: 'app-resume-photo',
  templateUrl: './resume-photo.component.html',
  styleUrls: ['./resume-photo.component.css'],
  
})
export class ResumePhotoComponent {
  jobSeeker!: jobSeeker;

  firstName = '';
  lastName = '';
  email = '';
  location = '';
  skillsText = '';

  saving = false;

  constructor(
    private jobSeekerService: JobseekerService
  ) { }

  ngOnInit(): void {
    const id = Number(localStorage.getItem('id'));
    this.getJobSeekerById(id);
  }

  getJobSeekerById(id: number): void {



    if (!id) {
      return;
    }

    this.jobSeekerService.getJobSeekerById(id).subscribe({
      next: (result) => {

        this.jobSeeker = result;

        this.firstName = result.firstName || '';
        this.lastName = result.lastName || '';
        this.email = result.email || '';
        this.location = result.location || '';

        this.skillsText =
          (result.skills || []).join(', ');
      },

      error: (err) => {
        console.error('Error loading job seeker:', err);
      }
    });
  }

  deleteResume() {
    const id = Number(localStorage.getItem('id'));
    this.jobSeekerService.deleteResume(id).subscribe({
      next: (res) => {

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onResumeSelected(event: Event): void {
  console.log('onResumeSelected called');

  const input = event.target as HTMLInputElement;

  console.log('Input:', input);
  console.log('Files:', input.files);

  if (!input.files || input.files.length === 0) {
    console.log('No file selected');
    return;
  }

  const file = input.files[0];

  console.log('Selected file:', file.name);
  console.log('Job seeker object:', this.jobSeeker);
  console.log('Job seeker ID:', this.jobSeeker?.id);

  if (!this.jobSeeker?.id) {
    console.error('Job seeker ID is undefined!');
    return;
  }

  this.jobSeekerService.uploadResume(
    this.jobSeeker.id,
    file
  ).subscribe({
    next: (response) => {
      console.log('Upload successful:', response);
      this.getJobSeekerById(this.jobSeeker.id!);
    },
    error: (error) => {
      console.error('UPLOAD ERROR:', error);
    }
  });
}
}
