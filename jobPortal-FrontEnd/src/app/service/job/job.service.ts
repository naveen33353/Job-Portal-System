import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPostDTO } from 'src/app/auth/Models/JobPost';
import { Job } from 'src/app/landing/models/job';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  url:string = environment.baseurl;

  constructor(private http:HttpClient) { }

  getAllJobs():Observable<Job[]>{
    return this.http.get<Job[]>(this.url + "jobs");
  }
  postJob(job:JobPostDTO):Observable<JobPostDTO>{
    return this.http.post<JobPostDTO>(this.url + "jobs",job);
  }

  getJobById(id:number):Observable<Job>{
    return this.http.get<Job>(this.url + 'jobs/' +id);
  }

  getSavedJobs(jobSeekerId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + 'jobs/saved/' + jobSeekerId);
  }

  saveJobToProfile(jobId: number, jobSeekerId: number): Observable<any> {
    return this.http.post(this.url + 'jobs/' + jobId + '/save/' + jobSeekerId, null, { responseType: 'text' });
  }

  removeSavedJob(jobId: number, jobSeekerId: number): Observable<any> {
    return this.http.delete(this.url + 'jobs/' + jobId + '/unsave/' + jobSeekerId, { responseType: 'text' });
  }
  deleteJob(id:number){
    return this.http.delete(this.url + "jobs/" + id);
  }

  // ---- Admin endpoints ----
  getJobCount(): Observable<number> {
    return this.http.get<number>(this.url + 'jobs/count');
  }

  setJobActive(id: number, active: boolean): Observable<any> {
    return this.http.put(this.url + 'jobs/' + id + '/active', { active });
  }
}
