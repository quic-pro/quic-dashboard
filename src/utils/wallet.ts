export function collapseAddress(address?: string, length = 4): string {
    if (!address) {
        return 'Loading...';
    } else {
        return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
    }
}
