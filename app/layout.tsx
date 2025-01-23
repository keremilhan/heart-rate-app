import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider } from '../context/ThemeProvider';
import { toastAutoClose } from '@/utils/constants';

export const metadata: Metadata = {
    title: 'Heart Rate App',
    description: 'A full-stack app for tracking heart rate measurements',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-light-bg h-full w-full dark:bg-dark-bg overflow-auto">
                <ThemeProvider>
                    <ToastContainer
                        position="top-center"
                        autoClose={toastAutoClose}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        style={{ padding: 5 }}
                    />
                    <header className="p-4 pb-0 w-fit h-fit">
                        <ThemeToggle />
                    </header>
                    <main className="w-full h-full p-0 flex justify-center items-center my-auto mb-0">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
