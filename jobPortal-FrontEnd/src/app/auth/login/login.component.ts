import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { login } from '../Models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router, private fb : FormBuilder, private service : AuthService){}

  loginForm = this.fb.group({
    email : ['', [Validators.required,Validators.email]],
    password : ['',[Validators.required, Validators.minLength(6)]]
  });

  loading = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.service.login(this.loginForm.value as login).subscribe({
      next: (res) => {
        const result: any = res;

        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);
        localStorage.setItem("id", result.id);

        this.loading = false;
        this.loginForm.reset();

        if (result.role == 'COMPANY') {
          this.router.navigate(['/company/company-dashboard']);
        }

        if (result.role == 'JOBSEEKER') {
          this.router.navigate(["/seeker/jobseeker-dashboard"]);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message ?? 'Invalid email or password.';
      }
    });
  }

}
