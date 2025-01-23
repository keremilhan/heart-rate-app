import type { Config } from 'tailwindcss';

export default {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#253963',
                    text: '#FFFFFF',
                },
                light: {
                    bg: '#E5E7EB',
                    text: '#000000',
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [],
} satisfies Config;
