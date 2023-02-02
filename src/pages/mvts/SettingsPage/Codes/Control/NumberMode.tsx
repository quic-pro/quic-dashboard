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
                <span className="mr-2">Mode:</span>
                <span>Number</span>
            </div>
            <div>
                <span className="mr-2">SIP domain:</span>
                <span>{data.hasSipDomain ? data.sipDomain : defaultSipDomain ?? ''}</span>
            </div>
            <div className="w-[300px] md:w-full">
                <span className="mr-2 whitespace-nowrap">SIP URI:</span>
                <span className="break-words">
                    {`${address!}@${data.hasSipDomain ? data.sipDomain : defaultSipDomain ?? ''}`}
                </span>
            </div>
            <div className="mt-4">
                <div>
                    <button onClick={handleChangeMode}
                        className="border rounded-md mb-2 px-1 mt-10 h-[34px]
                        bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                        dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                        dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                    >
                        Change Mode
                    </button>
                </div>
                <details className="flex flex-col my-3">
                    <summary>Set SIP Domain</summary>
                    <div className="flex flex-row">
                        <input type="text"
                            placeholder="newSipDomain"
                            value={newSipDomain}
                            onChange={(event) => handleChangeInput(event, setNewSipDomain)}
                            className="ml-5 my-3 h-[34px] px-2 rounded-md"
                        />
                        <button onClick={handleSetSipDomain}
                            className="ml-5 border rounded-md my-3 px-1 h-[34px]
                            bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                            dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                            dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                        >
                            Apply
                        </button>
                    </div>
                </details>
                <div>
                    <button onClick={handleClearSipDomain}
                        className="border rounded-md my-2 px-1 h-[34px]
                        bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                        dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                        dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                    >
                        Clear SIP Domain
                    </button>
                </div>
                <details className="flex flex-col my-3">
                    <summary>Transfer</summary>
                    <div className="flex flex-row">
                        <input type="text"
                            placeholder="to"
                            value={to}
                            onChange={(event) => handleChangeInput(event, setTo)}
                            className="ml-5 my-3 h-[34px] px-2 rounded-md"
                        />
                        <button onClick={handleTransfer}
                            className="ml-5 border rounded-md my-3 px-1 h-[34px]
                            bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                            dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                            dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                        >
                            Apply
                        </button>
                    </div>
                </details>
                <div>
                    <button onClick={handleRenounceOwnership}
                        className="border rounded-md mt-2 mb-5 px-1 h-[34px]
                        bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                        dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                        dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                    >
                        Renounce Ownership
                    </button>
                </div>
            </div>
        </div>
    );
}
