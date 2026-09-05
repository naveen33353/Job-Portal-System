import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { RegisterInitiate } from '../../Models/RegisterInitiate';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  constructor(private router: Router, private service: AuthService, private fb: FormBuilder) {}

  role: 'JOBSEEKER' | 'COMPANY' = 'JOBSEEKER';
  step: 'DETAILS' | 'OTP' = 'DETAILS';

  submitting = false;
  errorMessage = '';
  infoMessage = '';

  detailsForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    companyName: [''],
    website: [''],
    industry: [''],
    description: [''],
    skills: [''],
    location: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  selectRole(role: 'JOBSEEKER' | 'COMPANY') {
    this.role = role;
  }

  submitDetails() {
    this.errorMessage = '';

    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    if (this.detailsForm.value.password !== this.detailsForm.value.confirmPassword) {
      this.errorMessage = 'Password and confirm password do not match.';
      return;
    }

    const dto: RegisterInitiate = {
      role: this.role,
      email: this.detailsForm.value.email!,
      password: this.detailsForm.value.password!,
      confirmPassword: this.detailsForm.value.confirmPassword!,
      firstName: this.detailsForm.value.firstName || undefined,
      lastName: this.detailsForm.value.lastName || undefined,
      location: this.detailsForm.value.location || undefined,
      skills: this.role === 'JOBSEEKER'
        ? (this.detailsForm.value.skills || '')
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill !== '')
        : undefined,
      companyName: this.detailsForm.value.companyName || undefined,
      website: this.detailsForm.value.website || undefined,
      description: this.detailsForm.value.description || undefined,
      industry: this.detailsForm.value.industry || undefined
    };

    this.submitting = true;

    this.service.registerInitiate(dto).subscribe({
      next: (res: any) => {
        this.submitting = false;
        this.infoMessage = res?.message ?? 'OTP sent to your email.';
        this.step = 'OTP';
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message ?? 'Could not start registration. Please try again.';
      }
    });
  }

  verify() {
    this.errorMessage = '';

    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      this.errorMessage = 'Enter the 6-digit OTP sent to your email.';
      return;
    }

    this.submitting = true;

    this.service.verifyOtp({
      email: this.detailsForm.value.email!,
      otp: this.otpForm.value.otp!
    }).subscribe({
      next: (res: any) => {
        this.submitting = false;

        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('id', res.id);

        alert('Account verified and created successfully!');

        if (res.role === 'COMPANY') {
          this.router.navigate(['/company/company-dashboard']);
        } else {
          this.router.navigate(['/seeker/jobseeker-dashboard']);
        }
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message ?? 'Invalid or expired OTP.';
      }
    });
  }

  resend() {
    this.errorMessage = '';
    this.infoMessage = '';

    this.service.resendOtp(this.detailsForm.value.email!).subscribe({
      next: (res: any) => this.infoMessage = res?.message ?? 'OTP resent to your email.',
      error: (err) => this.errorMessage = err.error?.message ?? 'Could not resend OTP.'
    });
  }

  backToDetails() {
    this.step = 'DETAILS';
    this.errorMessage = '';
    this.infoMessage = '';
  }
}
