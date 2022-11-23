import {Signer} from '@ethersproject/abstract-signer';
import {Provider} from '@ethersproject/abstract-provider';
import {JsonRpcProvider} from '@ethersproject/providers';


import {
    Curator,
    DEFAULT_CURATOR_ADDRESS,
    DEFAULT_CURATOR_CHAIN_ID,
    DEFAULT_RPC_URLS,
    RootRouter
} from '@quic/mvts-resolver-js';


export let curator: Curator | null = null;
export let rootRouter: RootRouter | null = null;


export function initializeContracts(signer: Signer): Promise<{ curator: Curator, rootRouter: RootRouter }> {
    return new Promise((resolve, reject) => {
        curator = new Curator(DEFAULT_CURATOR_ADDRESS, new JsonRpcProvider(DEFAULT_RPC_URLS[DEFAULT_CURATOR_CHAIN_ID]));
        curator.getRootRouter()
            .then((rootRouterData) => {
                rootRouter = new RootRouter(rootRouterData[3], signer);
                // @ts-ignore
                resolve({curator, rootRouter});
            })
            .catch(reject);
    });
}
