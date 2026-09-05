import { Job } from "./job";

export class Company{
    "active":boolean;
    "companyId":number;
    "companyName":string;
    "description":string;
    "employeeCount":number;
    "industry":string;
    "jobs":Job[];
    "location":string;
    "website":string;
}