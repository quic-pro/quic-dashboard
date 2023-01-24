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
            colors: {
                quicBlueL: {
                    DEFAULT: '#f1f7fc', // blue bg & buttons (f6f6f6)
                    100: '#f1f7fc', // default / light
                    200: '#e9f0f4', // button hover / light
                    300: '#6bbff1', // icons / light gray blue
                    400: '#09a2ff', // headers / blue
                    500: '#3b99e0' // banner / gray blue
                },
                quicBlackL: {
                    DEFAULT: '#2b2f31', // bg bottom
                    100: '#2b2f31', // default / black
                    200: '#212529' // bg the bottest / black
                },
                quicBlueD: { // = quicBlueL
                    DEFAULT: '#f1f7fc', // blue bg & buttons (f6f6f6)
                    100: '#f1f7fc', // default / light
                    200: '#e9f0f4', // button hover / light
                    300: '#6bbff1', // icons / light gray blue
                    400: '#09a2ff', // headers / blue
                    500: '#3b99e0' // banner / gray blue
                },
                quicBlackD: { // = quicBlackL
                    DEFAULT: '#2b2f31', // bg bottom
                    100: '#2b2f31', // default / black
                    200: '#212529' // bg the bottest / black
                },
                mvtsL:{
                    DEFAULT: '#D0E1F9', // light gray
                    100: '#D0E1F9',  // default
                    200: '#378EFF', // blue
                    300: '#4D648D', // mouse gray
                    400: '#48668D', // gray
                    500: '#283655', // dark mouse gray
                    600: '#1A2431', // dark gray
                    700: '#181B20', // black
                    800: '#1E1F26' // black
                },
                mvtsD:{ // = mvtsL
                    DEFAULT: '#D0E1F9', // light gray
                    100: '#D0E1F9',  // default
                    200: '#378EFF', // blue
                    300: '#4D648D', // mouse gray
                    400: '#48668D', // gray
                    500: '#283655', // dark mouse gray
                    600: '#1A2431', // dark gray
                    700: '#181B20', // black
                    800: '#1E1F26' // black
                },
                bGround: {
                    DEFAULT: '#181B20', //color all area
                    100: '#1A2431' //color for bottom's gradient
                },
                bGroundL: {
                    DEFAULT: '#4d648d', //light blue
                    100: '#d0e1f9' //light gray
                },
                colorL: {
                    DEFAULT: '#1e1f26', //dark dark blue
                    100: '#283655' //dark indigo
                },
                projectBlue: '#378eff', //color big text, button
                textFooter: '#48668d', //color bottom text
            }
        },
    },
};
