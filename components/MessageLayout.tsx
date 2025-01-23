import Link from 'next/link';

export default function MessageLayout({ message }: { message: string }) {
    return (
        <div className="flex flex-col justify-center items-center gap-8 sm:gap-10">
            <h1 className="dark:text-dark-text text-lg sm:text-xl md:text-3xl text-center">{message}</h1>
            {message.includes('login') && (
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all">
                    Login Page
                </Link>
            )}
        </div>
    );
}
