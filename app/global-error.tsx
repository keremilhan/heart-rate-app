'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center mt-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-dark-text">Something went wrong</h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-dark-text">An unexpected error occurred. Please try again later.</p>
                    <p className="mt-2 text-lg text-gray-500 dark:text-dark-text">Error message: {error.message}</p>
                    <button onClick={reset} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Try Again
                    </button>
                </div>
            </body>
        </html>
    );
}
