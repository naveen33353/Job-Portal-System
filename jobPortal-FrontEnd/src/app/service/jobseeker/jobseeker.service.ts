import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jobSeeker } from 'src/app/auth/Models/jobSeeker';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {
constructor(private http : HttpClient) { }

  url = environment.baseurl + "jobseekers";

  getJobSeekerById(id : number){
    return this.http.get<jobSeeker>(`${this.url}/${id}`);
  }

  updateJobSeeker(id: number, js: Partial<jobSeeker>): Observable<jobSeeker> {
    return this.http.put<jobSeeker>(`${this.url}/${id}`, js);
  }

  // ---- Admin endpoints ----
  getAllJobSeekers(): Observable<jobSeeker[]> {
    return this.http.get<jobSeeker[]>(this.url);
  }

  getJobSeekerCount(): Observable<number> {
    return this.http.get<number>(this.url + '/count');
  }

  deleteJobSeeker(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  deleteResume(id : number){
return this.http.delete(this.url + "/" + id + "/resume");
  }

uploadResume(id: number, file: File) {
  const formData = new FormData();

  formData.append('file', file);

  return this.http.post(
    `${this.url}/${id}/uploadResume`,
    formData,
    {
      responseType: 'text'
    }
  );
}

}
