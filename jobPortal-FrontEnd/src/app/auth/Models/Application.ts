export class Application {
    id!: number;

    jobSeekerId!: number;
    jobSeekerName!: string;

    jobId!: number;
    jobTitle!: string;
    companyName?: string;

    status!: string;
    appliedDate!: Date;
}