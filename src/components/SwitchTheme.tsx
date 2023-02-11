import Switch from '@mui/material/Switch';
import {ChangeEvent, useState} from 'react';

import {getTheme} from '../utils/theme';


export default function SwitchTheme() {
    const [theme, setTheme] = useState(getTheme());

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newTheme = event.target.checked ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
        window.location.reload();
    };

    return (
        <Switch
            checked={theme === 'light'}
            onChange={handleChange}
            inputProps={{'aria-label': 'controlled'}}
            className="stroke-quicBlueL-300"
        />
    );
}
