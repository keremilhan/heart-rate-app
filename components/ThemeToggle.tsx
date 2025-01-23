'use client';

import { useTheme } from '@/context/ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="p-2 text-sm dark:bg-gray-200 rounded bg-gray-800 text-gray-200 dark:text-gray-800">
            Toggle Theme: {theme === 'light' ? '🌙' : '🌞'}
        </button>
    );
}
