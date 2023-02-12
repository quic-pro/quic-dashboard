import Switch from '@mui/material/Switch';
import {ChangeEvent} from 'react';
import {useRecoilState} from 'recoil';

import {themeState} from '../state/app';


export default function SwitchTheme() {
    const [theme, setTheme] = useRecoilState(themeState);

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
