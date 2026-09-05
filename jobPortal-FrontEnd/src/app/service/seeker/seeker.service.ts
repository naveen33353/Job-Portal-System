import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jobSeeker } from 'src/app/auth/Models/jobSeeker';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  url:string = environment.baseurl;

  constructor(private http : HttpClient) { }

  getSeekerById(id: number) {
  return this.http.get<jobSeeker>(this.url + "jobseekers/" + id);
}
}
