import {RootRouter} from '@mvts/contract-interfaces-js';
import {ChangeEvent, useLayoutEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useAccount} from 'wagmi';

import {notificationListState, NotificationType} from '../../../../../state/app';
import {rootRouterState} from '../../../../../state/dashboard/mvts';
import {getErrorMessage} from '../../../../../utils/getErrorMessage';


type Props = {
    code: number;
    data: RootRouter.CodeStructOutput;
};


export default function NumberMode({code, data}: Props) {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const rootRouter = useRecoilValue(rootRouterState);

    const [defaultSipDomain, setDefaultSipDomain] = useState<string | null>(null);
    const [newSipDomain, setNewSipDomain] = useState('');
    const [to, setTo] = useState('');

    const {address} = useAccount();

    useLayoutEffect(() => loadData(), [rootRouter]);

    const loadData = () => {
        if (!rootRouter || !address) {
            return;
        }

        setDefaultSipDomain(null);

        rootRouter.defaultSipDomain()
            .then(setDefaultSipDomain)
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to get default SIP domain: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>, setState: (newValue: string) => void) => {
        setState(event.target.value);
    };

    const handleChangeMode = () => {
        rootRouter?.changeCodeMode(code)
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.INFORMATION,
                    context: `Code ${code}: Mode change transaction sent.`,
                }]);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to send transaction: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleSetSipDomain = () => {
        rootRouter?.setCodeSipDomain(code, newSipDomain)
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.INFORMATION,
                    context: `Code ${code}: Set SIP domain transaction sent.`,
                }]);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to send transaction: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleClearSipDomain = () => {
        rootRouter?.clearCodeSipDomain(code)
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.INFORMATION,
                    context: `Code ${code}: Clear SIP domain transaction sent.`,
                }]);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to send transaction: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleTransfer = () => {
        rootRouter?.['safeTransferFrom(address,address,uint256)'](address!, to, code)
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.INFORMATION,
                    context: `Code ${code}: Transfer transaction sent.`,
                }]);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to send transaction: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleRenounceOwnership = () => {
        rootRouter?.renounceOwnershipOfCode(code)
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.INFORMATION,
                    context: `Code ${code}: Renounce ownership transaction sent.`,
                }]);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to send transaction: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    return (
        <div>
            <div>
                <span>Mode:</span>
                <span>Number</span>
            </div>
            <div>
                <span>SIP domain:</span>
                <span>{data.hasSipDomain ? data.sipDomain : defaultSipDomain ?? ''}</span>
            </div>
            <div>
                <span>SIP URI:</span>
                <span>{`${address!}@${data.hasSipDomain ? data.sipDomain : defaultSipDomain ?? ''}`}</span>
            </div>
            <div className="mt-4">
                <div>
                    <button onClick={handleChangeMode} className="border">Change Mode</button>
                </div>
                <details className="flex flex-col">
                    <summary>Set SIP Domain</summary>
                    <input type="text" placeholder="newSipDomain" value={newSipDomain} onChange={(event) => handleChangeInput(event, setNewSipDomain)}/>
                    <button onClick={handleSetSipDomain} className="border">Apply</button>
                </details>
                <div>
                    <button onClick={handleClearSipDomain} className="border">Clear SIP Domain</button>
                </div>
                <details className="flex flex-col">
                    <summary>Transfer</summary>
                    <input type="text" placeholder="to" value={to} onChange={(event) => handleChangeInput(event, setTo)}/>
                    <button onClick={handleTransfer} className="border">Apply</button>
                </details>
                <div>
                    <button onClick={handleRenounceOwnership} className="border">Renounce Ownership</button>
                </div>
            </div>
        </div>
    );
}
