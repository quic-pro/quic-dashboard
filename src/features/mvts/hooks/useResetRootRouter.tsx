import {useCallback} from 'react';
import {useResetRecoilState} from 'recoil';

import {rootRouterState} from '../state/rootRouter';


export function useResetRootRouter() {
    const resetRootRouter = useResetRecoilState(rootRouterState);

    return useCallback(() => resetRootRouter(), [resetRootRouter]);
}
