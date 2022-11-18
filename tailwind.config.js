/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{jsx,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                spinSlow: 'spin 2s linear infinite'
            }
        },
    },
    plugins: []
};
