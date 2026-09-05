export class RegisterInitiate {
    role!: 'JOBSEEKER' | 'COMPANY';

    email!: string;
    password!: string;
    confirmPassword!: string;

    // Job seeker fields (ignored when role = COMPANY)
    firstName?: string;
    lastName?: string;
    skills?: string[];
    location?: string;

    // Company fields (ignored when role = JOBSEEKER)
    companyName?: string;
    website?: string;
    description?: string;
    industry?: string;
    employeeCount?: number;
}
