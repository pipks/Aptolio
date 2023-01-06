import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { RiseWallet } from '@rise-wallet/wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const wallets = [
  new MartianWallet(),
  new PetraWallet(),
  new PontemWallet(),
  new RiseWallet(),
];

const root = ReactDOM.createRoot(document.getElementById('root'));
window.addEventListener('load', () => {
  root.render(
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={false}>
      <App />
    </AptosWalletAdapterProvider >
  );
})