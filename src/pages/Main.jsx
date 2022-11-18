import React from 'react';
import WalletConnect from "../components/WalletConnection";
import {Navigate} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";


export default function MainPage() {
    const {account, ENSName} = useWeb3React();

    if (account || ENSName) {
        return <Navigate to="/dashboard"/>
    } else {
        return <WalletConnect/>;
    }
}
