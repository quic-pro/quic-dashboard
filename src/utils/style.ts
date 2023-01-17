export function getStyle(...args: (undefined | string)[]): string {
    return args.join(' ').trimEnd();
}
