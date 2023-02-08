import {formatEther} from '@ethersproject/units';
import {BigNumber} from 'ethers';


export function roundBigNumber(balance: BigNumber, maxLength = 4): string {
    const regexp = new RegExp(`.*\\..{0,${maxLength}}`, 'g');
    return formatEther(balance).match(regexp)?.[0] ?? balance.toString();
}
