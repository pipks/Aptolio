import React, { useRef, useEffect } from 'react'
import DisconnectButton from './DisconnectButton'
import ConnectButton from './ConnectButton'
import { useToast } from 'hooks/useToast';
import { useWallet } from "@aptos-labs/wallet-adapter-react";


export default function Modal() {
  const mountedRef = useRef(true);
  const toast = useToast()
  const { connect, connected, wallets } = useWallet();

  const isConnected = localStorage.getItem('isWalletConnected');

  const connectWalletOnPageLoad = () => {
    if (connected === false && isConnected === 'true') {
      try {
        const connectedWallet = localStorage.getItem('connectedWallet')
        if (connectedWallet === 'Martian') {
          connect(wallets[0].name)
        } else if (connectedWallet === 'Petra') {
          connect(wallets[1].name)
        } else {
          connect(wallets[2].name)
        }
      } catch (ex) {
        toast('error', 'oh no', ex)
      }
    }
  };

  useEffect(() => {
    connectWalletOnPageLoad()
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className='p-3 flex items-center gap-2'>
      {connected === true && isConnected === 'true' ? (
        <div>
          <DisconnectButton />
        </div>
      ) : <ConnectButton />}
    </div>
  );
}