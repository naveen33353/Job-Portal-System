import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { min } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { jobSeeker } from '../../Models/jobSeeker';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.css']
})
export class SeekerComponent {

  constructor(private route : Router,private service  : AuthService, private fb : FormBuilder){}


regSeeker = this.fb.group({
  firstName : ['', Validators.required],
  lastName : ['',Validators.required],
  email : ['',[Validators.required,Validators.email]],
  password : ['',[Validators.required, Validators.minLength(6)]],
   skills:  ['', Validators.required],
  location : ['',Validators.required]
});


 onSubmit() {

  if (this.regSeeker.invalid) {
    alert("Please fill all required fields.");
    return;
  }

  const formValue: jobSeeker = {
    firstName: this.regSeeker.value.firstName!,
    lastName: this.regSeeker.value.lastName!,
    email: this.regSeeker.value.email!,
    password: this.regSeeker.value.password!,
    location: this.regSeeker.value.location!,
    skills: this.regSeeker.value.skills!
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '')
  };

  this.service.signUp(formValue).subscribe({
    next: (res) => {
      console.log(res);

      alert("Profile Created Successfully");

      this.regSeeker.reset();

      this.route.navigate(['/auth/login']);
    },

    error: (err) => {
      console.error(err);
      alert("Registration Failed");
    }
  });
}


}
