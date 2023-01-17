/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.tsx'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                spinSlow: 'spin 2s linear infinite',
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    'lg': '2rem',
                    'xl': '3rem',
                    '2xl': '6rem',
                },
            },
            colors: {
                'background': '#f1f7fc',
            },
        },
    },
};
