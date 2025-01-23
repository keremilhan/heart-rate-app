import { ERROR_MESSAGES } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json({
                message: 'Username is required',
                status: 400,
            });
        }
        const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${endpoint}/api/measurements?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            return NextResponse.json({ message: 'success', status: 200, measurements: result.measurements });
        } else {
            if (response.status == 401) {
                return NextResponse.json({ message: ERROR_MESSAGES.unauthorized }, { status: response.status });
            } else {
                return NextResponse.json({ message: result.message || ERROR_MESSAGES.fetchFailed }, { status: response.status });
            }
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : ERROR_MESSAGES.unexpected;
        return NextResponse.json({ message: message }, { status: 500 });
    }
}
