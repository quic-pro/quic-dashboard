import {useEffect} from 'react';
import {useConnect} from 'wagmi';

import {injectedConnector} from '../../constants/connectors';
import {isMobileOrTable} from '../../utils/userAgent';
import ConnectorButton from './ConnectorButton';


export default function Connectors() {
    const {connectors, error} = useConnect();

    useEffect(() => {
        if (error) {
            // TODO: Show notification with error.message
        }
    }, []);

    return (
        <div className="flex flex-col">
            {connectors.map((connector) => {
                if ((connector === injectedConnector) && (!connector.ready || !isMobileOrTable)) {
                    return null;
                }

                return <ConnectorButton key={connector.id} connector={connector} className="m-1"/>;
            })}
        </div>
    );
}
