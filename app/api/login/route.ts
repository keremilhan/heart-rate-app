import { ERROR_MESSAGES } from '@/utils/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const username = body.username.trim();

        if (!username) {
            return NextResponse.json({
                message: 'Username is required',
                status: 400,
            });
        }

        const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${endpoint}/api/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        const result = await response.json();

        if (response.ok) {
            return NextResponse.json({ message: 'success', status: 200, result });
        } else {
            return NextResponse.json({ message: result.message || ERROR_MESSAGES.loginFailed }, { status: response.status });
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : ERROR_MESSAGES.unexpected;
        throw new Error(message);
    }
}
