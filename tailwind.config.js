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
                padding: '1rem'
            },
        },
    },
};
