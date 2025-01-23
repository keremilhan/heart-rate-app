'use client';

import { ERROR_MESSAGES } from '@/utils/constants';
import customToast from '@/utils/customToast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Form() {
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        if (!username.trim()) {
            return customToast(ERROR_MESSAGES.emptyUsername, 'error');
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim() }),
            });

            const result = await response.json();

            if (response.ok) {
                router.push(`/dashboard?username=${username.trim()}`);
            } else {
                customToast(result.message, 'error');
            }
        } catch (error) {
            if (error instanceof Error) {
                customToast(error.message, 'error');
            } else {
                customToast(ERROR_MESSAGES.unexpected, 'error');
            }
        }
    };

    return (
        <div className="w-full px-4 max-w-lg mx-auto">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 sm:mb-16 text-light-text dark:text-dark-text">Welcome to Heart Rate App</h2>
            <form className="mb-6 flex flex-col items-center gap-4 sm:gap-6" onSubmit={handleSubmit}>
                <input
                    onChange={handleChangeUsername}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                />
                <button className="w-full sm:w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all" type="submit">
                    Login
                </button>
            </form>
            <p className="text-center text-sm sm:text-base text-gray-500">&copy;2025 Kerem Ilhan. All rights reserved.</p>
        </div>
    );
}
