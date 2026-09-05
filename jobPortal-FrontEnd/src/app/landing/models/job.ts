export class Job{
    "jobId":string;
    "description":string;
    "postedDate":Date;
    "endDate":Date;
    "skills":string[];
    "experience":string;
    "salary":string;
    "companyName":string;
    "active"!:boolean;
    "jobTitle":string;
    "jobType":string;
    "location":string;
    "applicantCount"!: number;
}