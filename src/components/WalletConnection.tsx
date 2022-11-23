import {useWeb3React} from '@web3-react/core';
import {Connector} from '@web3-react/types';
import Loader from './Loader';
import React, {useCallback, useEffect, useState} from 'react';

import MetamaskIcon from '../assets/images/metamask.png';
import {injected} from '../connectors';
import {getWalletForConnector} from '../connectors';
import {CHAIN_INFO} from '../constants/chain';
import {SUPPORTED_WALLETS} from '../constants/wallet';
import {useAppDispatch} from '../state/hooks';
import {isMobileOrTable} from '../utils/userAgent';


export default function WalletConnect() {
    return (
        <div className='bg-companyL dark:bg-companyD h-screen w-screen flex items-center justify-center'>
            <div className="mx-[30px] md:mx-0 pb-[30px] p-[10px] max-h-[370px] max-w-[600px] bg-white dark:bg-white rounded-lg shadow-lg shadow-gray-400/30">
                <div className="flex flex-col items-center justify-center gap-[20px]">
                    <div
                        className="dark:text-projectBlue text-colorL-100 text-[27px] my-[10px] leading-none font-Comfort text-center">
                        Connect a wallet to work with the dashboard:
                    </div>
                    <Content/>
                </div>
            </div>
        </div>
    );
}

function Content() {
    const dispatch = useAppDispatch();
    const {connector, account, ENSName} = useWeb3React();

    const [isPendingConnect, setIsPendingConnect] = useState(false);

    const tryActivation = useCallback(
        async (connector: Connector) => {
            const wallet = getWalletForConnector(connector);

            try {
                setIsPendingConnect(true);

                await connector.activate(CHAIN_INFO);

            } catch (error) {
                console.debug(`web3-react connection error: ${error}`);
                setIsPendingConnect(false);
            }
        },
        [dispatch]
    );

    function getOptions() {
        const isMetaMask = !!window.ethereum?.isMetaMask;
        const isCoinbaseWallet = !!window.ethereum?.isCoinbaseWallet;

        return Object.keys(SUPPORTED_WALLETS).map((key) => {
            const option = SUPPORTED_WALLETS[key];

            const optionProps = {
                isActive: option.connector === connector && (!!ENSName || !!account),
                id: `connect-${key}`,
                link: option.href,
                header: option.name,
                color: option.color,
                icon: option.iconURL
            };

            // check for mobile options
            if (isMobileOrTable) {
                if (
                    (option.mobile && !isMetaMask && !isCoinbaseWallet) ||
                    (isMetaMask && option.name === 'MetaMask') ||
                    (isCoinbaseWallet && option.name === 'Coinbase Wallet')
                ) {
                    return (
                        <Option
                            key={key}
                            {...optionProps}
                            onClick={() => {
                                if (!optionProps.isActive && !option.href && !!option.connector) {
                                    tryActivation(option.connector);
                                }
                            }}
                        />
                    );
                }
                return null;
            }

            if (option.connector === injected) {
                if (!(window.web3 || window.ethereum)) {
                    if (option.name === 'MetaMask') {
                        return (
                            <Option
                                id={`connect-${key}`}
                                key={key}
                                color={'#E8831D'}
                                header={<>Install MetaMask</>}
                                link={'https://metamask.io/'}
                                icon={MetamaskIcon}
                            />
                        );
                    } else {
                        return null;
                    }
                } else if (option.name === 'MetaMask' && !isMetaMask) {
                    return null;
                } else if (option.name === 'Injected' && isMetaMask) {
                    return null;
                }
            }

            return (
                !isMobileOrTable &&
                !option.mobileOnly && (
                    <Option
                        {...optionProps}
                        onClick={() => {
                            option.connector === connector && !!ENSName
                                ? null
                                : (
                                    optionProps.isActive
                                        ? null
                                        : !option.href && option.connector && tryActivation(option.connector)
                                );
                        }}
                    />
                )
            );
        });
    }

    return (
        <>
            {
                isPendingConnect
                    ? <Loader/>
                    : <div className="grid gap-[10px] grid-cols-1" data-testid="option-grid">{getOptions()}</div>
            }
        </>
    );
}

function Option({
                    link = null,
                    onClick = null,
                    header,
                    icon,
                    isActive = false,
                    id
                }: {
    link?: string | null
    onClick?: null | (() => void)
    color: string
    header: React.ReactNode
    icon: string
    isActive?: boolean
    id: string
}) {
    const content = (
        <button
            id={id}
            onClick={onClick ?? (() => undefined)}
            className="flex p-4 w-full hover:cursor-pointer hover:bg-companyL-200 dark:hover:bg-companyD-200 border-2 rounded-lg items-center justify-between bg-companyL dark:bg-companyD text-companyL-400 dark:text-companyD-400"
        >
            <div className="flex flex-col flex-nowrap justify-center h-full">
                <div className="flex flex-row flex-nowrap md:text-base text-left text-xs">
                    {
                        isActive
                            ? <div className="flex justify-center items-center text-[#27AE60]">
                                <div
                                    className="flex flex-row flex-nowrap justify-center items-center w-[8px] h-[8px] mr-[10px] bg-[#27AE60] rounded-full">
                                    <div/>
                                </div>
                            </div>
                            : <div className="w-[8px] h-[8px] mr-[10px]"/>
                    }
                    {header}
                </div>
            </div>
            <div className="flex flex-column ml-[40px] flex-nowrap items-end justify-center h-[24px] w-[24px]">
                <img src={icon} alt={'Icon'}/>
            </div>
        </button>
    );

    if (link) {
        return <a href={link}>{content}</a>;
    }

    return content;
}
