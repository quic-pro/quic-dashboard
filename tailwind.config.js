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
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    'lg': '2rem',
                    'xl': '3rem',
                    '2xl': '6rem'
                }
            },
            colors: {
                'companyL': {
                    DEFAULT: '#f1f7fc', // blue bg & buttons (f6f6f6)
                    100: '#f1f7fc', // default
                    200: '#e9f0f4', // button hover
                    300: '#6bbff1', // icons
                    400: '#09a2ff', // headers
                    500: '#3b99e0', // banner
                },
                'companyBottomL': {
                    DEFAULT: '#2b2f31', // bg bottom
                    100: '#2b2f31', // default
                    200: '#212529', // bg the bottest
                },
                'companyD': { // = companyL
                    DEFAULT: '#f1f7fc', // blue bg & buttons (f6f6f6)
                    100: '#f1f7fc', // default
                    200: '#e9f0f4', // button hover
                    300: '#6bbff1', // icons
                    400: '#09a2ff', // headers
                    500: '#3b99e0', // banner
                },
                'companyBottomD': { // = companyBottomL
                    DEFAULT: '#2b2f31', // bg bottom
                    100: '#2b2f31', // default
                    200: '#212529', // bg the bottest
                }
            }
        },
    },
    plugins: []
};
