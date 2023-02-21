type ThemeName = 'light' | 'dark';


function getPrefersColorScheme(): ThemeName {
    return (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}


export function getTheme(): ThemeName {
    const themeFromLocalStorage = localStorage.getItem('theme');
    if ((themeFromLocalStorage === 'light') || (themeFromLocalStorage === 'dark')) {
        return themeFromLocalStorage;
    } else {
        return getPrefersColorScheme();
    }
}
