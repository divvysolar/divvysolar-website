/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0e1b3d',
                    light: '#162b61',
                    dark: '#070e1f',
                },
                accent: {
                    DEFAULT: '#fecb00',
                    light: '#ffd42e',
                    dark: '#e5b600',
                },
                navy: '#0e1b3d',
                solar: '#fecb00',
                navy: '#0e1b3d',
                solar: '#fecb00',
                // Darken gray shades for better content readability
                gray: {
                    50:  '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#9CA3AF', // was #D1D5DB — slightly darker
                    400: '#6B7280', // was #9CA3AF — now gray-500 level
                    500: '#4B5563', // was #6B7280 — now gray-600 level
                    600: '#374151', // was #4B5563 — now gray-700 level
                    700: '#1F2937',
                    800: '#111827',
                    900: '#0F172A',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
    ],
}
