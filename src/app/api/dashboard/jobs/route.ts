import { NextResponse } from 'next/server';

export async function GET() {
    // Example jobs list that the dashboard can display until real backend is wired.
    const jobs = [
        { id: 'job_1', title: 'Web & Mobile Prototype Designer', meta: 'Remote · 3 openings', logoChar: 'W', logoClass: 'company-logo-a' },
        { id: 'job_2', title: 'Senior Frontend Engineer', meta: 'Bengaluru · 1 opening', logoChar: 'F', logoClass: 'company-logo-p' },
        { id: 'job_3', title: 'Product Designer', meta: 'Hybrid · 2 openings', logoChar: 'P', logoClass: 'company-logo-d' },
    ];

    return NextResponse.json(jobs);
}
