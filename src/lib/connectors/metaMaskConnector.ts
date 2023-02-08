import {MetaMaskConnector as WagmiMetaMaskConnector} from 'wagmi/connectors/metaMask';


export class MetaMaskConnector extends WagmiMetaMaskConnector {
    constructor(parameters: ConstructorParameters<typeof WagmiMetaMaskConnector>[0] = {}) {
        super(parameters);
    }


    // ----- [PUBLIC METHODS] ------------------------------------------------------------------------------------------

    public override async connect(options: { chainId?: number } = {}) {
        if (!this.ready) {
            window.open(new URL(`https://metamask.app.link/dapp/${window.origin.replace(/http(|s):\/\//, '')}/`));
        }

        return super.connect(options);
    }
}
