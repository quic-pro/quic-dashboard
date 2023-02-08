import {useConnect} from 'wagmi';

import {injectedConnector} from '../../constants/connectors';
import {isMobileOrTable} from '../../utils/userAgent';
import ConnectorButton from './ConnectorButton';


export default function Connectors() {
    const {connectors} = useConnect();

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
