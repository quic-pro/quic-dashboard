import {HTMLAttributes} from 'react';
import {useConnect} from 'wagmi';

import {injectedConnector} from '../../constants/connectors';
import {getStyle} from '../../utils/style';
import {isMobileOrTable} from '../../utils/userAgent';
import ConnectorButton from './ConnectorButton';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Connectors({className, ...attributes}: Props) {
    const {connectors} = useConnect();

    const style = {
        container: getStyle('flex flex-col flex-1 items-center', className),
        connectorButton: 'm-1',
    };

    return (
        <div {...attributes} className={style.container}>
            {connectors.map((connector) => {
                if ((connector === injectedConnector) && (!connector.ready || !isMobileOrTable)) {
                    return null;
                }

                return <ConnectorButton key={connector.id} connector={connector} className={style.connectorButton}/>;
            })}
        </div>
    );
}
