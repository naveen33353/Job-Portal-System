import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from 'src/app/auth/Models/Interview';
import { InterviewRequest } from 'src/app/auth/Models/InterviewRequest';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  url: string = environment.baseurl;

  constructor(private http: HttpClient) {}

  scheduleInterview(dto: InterviewRequest): Observable<Interview> {
    return this.http.post<Interview>(this.url + 'interviews', dto);
  }

  updateInterview(id: number, dto: InterviewRequest): Observable<Interview> {
    return this.http.put<Interview>(this.url + 'interviews/' + id, dto);
  }

  getInterviewById(id: number): Observable<Interview> {
    return this.http.get<Interview>(this.url + 'interviews/' + id);
  }

  getInterviewsByApplication(applicationId: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.url + 'interviews/application/' + applicationId);
  }

  getInterviewsByJobSeeker(jobSeekerId: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.url + 'interviews/jobseeker/' + jobSeekerId);
  }

  getInterviewsByCompany(companyId: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.url + 'interviews/company/' + companyId);
  }

  updateStatus(id: number, status: string): Observable<Interview> {
    return this.http.put<Interview>(this.url + 'interviews/' + id + '/status/' + status, {});
  }

  submitFeedback(id: number, feedback: string): Observable<Interview> {
    return this.http.put<Interview>(this.url + 'interviews/' + id + '/feedback', { feedback });
  }

  cancelInterview(id: number): Observable<any> {
    return this.http.put(this.url + 'interviews/' + id + '/cancel', {});
  }

  deleteInterview(id: number): Observable<any> {
    return this.http.delete(this.url + 'interviews/' + id);
  }
}
