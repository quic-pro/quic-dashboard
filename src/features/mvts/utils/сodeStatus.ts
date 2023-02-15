import {CodeStatus} from '@mvts/contract-interfaces-js';


export function getCodeStatus(codeStatus: CodeStatus): string {
    switch (codeStatus) {
        case CodeStatus.AvailableForMinting:
            return 'Available for minting';
        case CodeStatus.Active:
            return 'Active';
        case CodeStatus.Held:
            return 'Held';
        case CodeStatus.Blocked:
            return 'Blocked';
        default:
            return 'Unknown';
    }
}
