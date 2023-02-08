import Switch from '@mui/material/Switch';
import React from 'react';

export default function SwithTheme() {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const setLight = () => {
        localStorage['theme'] = 'light';
        setCheckTheme(false);
        window.location.reload();
    };
    const setDark = () => {
        localStorage['theme'] = 'dark';
        setCheckTheme(true);
        window.location.reload();
    };
    /* const setSystem = () => {
        localStorage.removeItem('theme');
        window.location.reload();
    };*/

    const setTheme = () => {
        switch (localStorage['theme']) {
            case 'light':
                return false;
            case 'dark':
                return true;
            default:
                if (prefersDark) {
                    return true;
                } else {
                    return false;
                }
        }
    };

    const [checkTheme, setCheckTheme] = React.useState(setTheme);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(checkTheme);
        setCheckTheme(event.target.checked);
        console.log(checkTheme);
        if (!checkTheme) {
            setDark();
            console.log('dark');
        } else {
            setLight();
            console.log('light');
        }
    };

    return (
        <Switch
            className='stroke-quicBlueL-300'
            checked={checkTheme}
            onChange={handleChange}
            inputProps={{'aria-label': 'controlled'}}
        />
    );
}
