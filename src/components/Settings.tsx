import SwitchTheme from './SwitchTheme';


export default function Settings() {
    return (
        <div className="flex flex-row p-2 bg-white border">
            <div className="flex flex-row text-sm items-center">
                Change Theme: <SwitchTheme/>
            </div>
        </div>
    );
}
