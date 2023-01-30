import {RootRouter} from '@mvts/contract-interfaces-js';
import {ChangeEvent, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useAccount} from 'wagmi';

import {useChangeCodeMode, useSetCodeRouter} from '../../../../../hooks/mvts/rootRouter';
import {notificationListState, NotificationType} from '../../../../../state/app';
import {rootRouterState} from '../../../../../state/dashboard/mvts';
import {getErrorMessage} from '../../../../../utils/getErrorMessage';


type Props = {
    code: number;
    data: RootRouter.CodeStructOutput;
};


export default function PoolMode({code, data}: Props) {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const rootRouter = useRecoilValue(rootRouterState);

    const [newChainId, setNewChainId] = useState('');
    const [newAdr, setNewAdr] = useState('');
    const [newPoolCodeLength, setNewPoolCodeLength] = useState('');
    const [to, setTo] = useState('');

    const {address} = useAccount();

    const changeCodeMode = useChangeCodeMode();
    const setCodeRouter = useSetCodeRouter();

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>, setState: (newValue: string) => void) => {
        setState(event.target.value);
    };

    const handleClearRouter = () => {
        rootRouter?.clearCodeSipDomain(code)
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.INFORMATION,
                    context: `Code ${code}: Clear router transaction sent.`,
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
                <span>Pool</span>
            </div>
            <div>
                <span>Router:</span>
                <span>{data.hasRouter ? '' : 'No router'}</span>
            </div>
            {data.hasRouter && (
                <div className="ml-8">
                    <div>
                        <span>Chain ID:</span>
                        <span>{data.router.chainId.toString()}</span>
                    </div>
                    <div>
                        <span>Address:</span>
                        <span>{data.router.adr}</span>
                    </div>
                    <div>
                        <span>Pool code length:</span>
                        <span>{data.router.poolCodeLength.toString()}</span>
                    </div>
                </div>
            )}
            <div className="mt-4">
                <div>
                    <button onClick={() => changeCodeMode(code)} className="border">Change Mode</button>
                </div>

                <details className="flex flex-col">
                    <summary>Set Route</summary>
                    <input type="text" placeholder="newChainId" value={newChainId} onChange={(event) => handleChangeInput(event, setNewChainId)}/>
                    <input type="text" placeholder="newAdr" value={newAdr} onChange={(event) => handleChangeInput(event, setNewAdr)}/>
                    <input type="text" placeholder="newPoolCodeLength" value={newPoolCodeLength} onChange={(event) => handleChangeInput(event, setNewPoolCodeLength)}/>
                    <button onClick={() => setCodeRouter(code, newChainId, newAdr, newPoolCodeLength)} className="border">Apply</button>
                </details>
                <div>
                    <button onClick={handleClearRouter} className="border">Clear Router</button>
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
