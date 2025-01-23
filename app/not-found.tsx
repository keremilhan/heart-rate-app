'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="text-center mt-12">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-dark-text">404 - Page Not Found</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-dark-text">Sorry, the page you are looking for does not exist.</p>
            <Link href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Go Back Home
            </Link>
        </div>
    );
}
