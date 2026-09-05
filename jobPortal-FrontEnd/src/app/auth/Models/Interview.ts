export class Interview {
    id!: number;

    applicationId!: number;
    jobId!: number;
    jobTitle!: string;
    jobSeekerId!: number;
    jobSeekerName!: string;
    companyName!: string;

    scheduledAt!: Date;
    mode!: 'ONLINE' | 'OFFLINE';
    location!: string;
    interviewerName!: string;
    status!: 'SCHEDULED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';
    notes?: string;
    feedback?: string;
}
