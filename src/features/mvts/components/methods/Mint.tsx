import {useMintPrice} from '../../hooks/useRootRouterData';
import {useMint} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function Mint({code}: Props) {
    const mint = useMint();
    const mintPrice = useMintPrice();

    const method = (code: number) => mint(code, {value: mintPrice.data!});

    return <Base name="Mint" code={code} method={method} disabled={!mintPrice.data}/>;
}
