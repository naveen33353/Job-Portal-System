import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jobSeeker } from '../auth/Models/jobSeeker';
import { environment } from 'src/environment/environment';
import { login } from '../auth/Models/login';
import { Company } from '../auth/Models/Company';
import { RegisterInitiate } from '../auth/Models/RegisterInitiate';
import { OtpVerify } from '../auth/Models/OtpVerify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  url = environment.baseurl
   logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('adminUsername');
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

signUp(js : jobSeeker){
  return this.http.post(this.url +"jobseekers", js);
}

signUpCompany(comp : Company){
  return this.http.post(this.url + "company" , comp)
}

login(login : login){
return this.http.post(this.url + "auth/login", login);
}

// ---- OTP-verified registration (separate, additional sign-up flow) ----
registerInitiate(dto: RegisterInitiate){
  return this.http.post(this.url + "auth/register/initiate", dto);
}

verifyOtp(dto: OtpVerify){
  return this.http.post(this.url + "auth/register/verify-otp", dto);
}

resendOtp(email: string){
  return this.http.post(this.url + "auth/register/resend-otp", { email });
}

}