import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Company } from '../../Models/Company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
constructor(private route : Router , private service : AuthService , private fb : FormBuilder){}

companyReg = this.fb.group({
    companyName :['',Validators.required],
    email :['',Validators.required],
    password :['',Validators.required],
    website :['',Validators.required],
    location :['',Validators.required],
    description :['',Validators.required]
})

submitting = false;

submit(){
  if (this.companyReg.invalid) {
    this.companyReg.markAllAsTouched();
    alert("Please fill all required fields.");
    return;
  }

  this.submitting = true;

  this.service.signUpCompany(this.companyReg.value as Company).subscribe({
    next: (res) => {
      this.submitting = false;
      this.companyReg.reset();
      alert("Company Created !\n Welcome to Hirehub.");
      this.route.navigate(['/auth/login']);
    },
    error: (err) => {
      this.submitting = false;
      console.log("ERROR", err);
      alert(err.error?.message ?? "Something Went Wrong.\n Please try again");
    }
  });
}

}
