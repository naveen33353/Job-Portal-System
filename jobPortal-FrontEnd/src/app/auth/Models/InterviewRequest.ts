export class InterviewRequest {
    applicationId!: number;
    scheduledAt!: string;
    mode!: 'ONLINE' | 'OFFLINE';
    location!: string;
    interviewerName!: string;
    notes?: string;
}
