import { NextResponse } from 'next/server';

export async function GET() {
    // Return a simple array of numbers representing job views per day (example data)
    const views = [12, 34, 28, 45, 22, 18, 30, 26];
    return NextResponse.json(views);
}
