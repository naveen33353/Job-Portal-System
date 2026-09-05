import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/landing/models/company';
import { Job } from 'src/app/landing/models/job';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url:string = environment.baseurl;

  constructor(private http : HttpClient) { }

  getAllCompanies():Observable<Company[]>{
    return this.http.get<Company[]>(this.url + "company");
  }

  getCompanyById(id:number):Observable<Company>{
    return this.http.get<Company>(this.url + "company/" + id);
  }

  updateCompany(id: number, comp: Partial<Company>): Observable<Company> {
    return this.http.put<Company>(this.url + "company/" + id, comp);
  }

  getJobsByCompany(compId:number):Observable<Job[]>{
    return this.http.get<Job[]>(this.url + "jobs/company/" + compId);
  }

  // ---- Admin endpoints ----
  getCompanyCount(): Observable<number> {
    return this.http.get<number>(this.url + 'company/count');
  }
}
