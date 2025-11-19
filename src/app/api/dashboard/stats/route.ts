import { NextResponse } from 'next/server';

export async function GET() {
    // Minimal stub returning example dashboard stats to avoid 404s while backend is not implemented.
    const stats = {
        postedJobs: 12,
        shortlisted: 4,
        application: 128,
        savedCandidates: 7,
    };

    return NextResponse.json(stats);
}
