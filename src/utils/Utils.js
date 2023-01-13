import resolveConfig from 'tailwindcss/resolveConfig';


export const tailwindConfig = () => resolveConfig('./src/css/tailwind.config.js');


export const hexToRGB = (h) => {
    let r = 0;
    let g = 0;
    let b = 0;
    if ((typeof h == 'string') && (h.length === 4)) {
        r = `0x${h[1]}${h[1]}`;
        g = `0x${h[2]}${h[2]}`;
        b = `0x${h[3]}${h[3]}`;
    } else if ((typeof h == 'string') && (h.length === 7)) {
        r = `0x${h[1]}${h[2]}`;
        g = `0x${h[3]}${h[4]}`;
        b = `0x${h[5]}${h[6]}`;
    }
    return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
    notation: 'compact'
}).format((typeof value == 'number') && value);
