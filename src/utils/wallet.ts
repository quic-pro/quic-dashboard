import {formatEther} from '@ethersproject/units';
import {BigNumber} from 'ethers';


export function collapseAddress(address?: string, length = 4): string {
    if (!address) {
        return 'Loading...';
    } else {
        return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
    }
}

export function roundBalance(balance: BigNumber, length = 4): string {
    const regexp = new RegExp(`.*\\..{0,${length}}`, 'g');
    return formatEther(balance).match(regexp)?.[0] ?? balance.toString();
}
