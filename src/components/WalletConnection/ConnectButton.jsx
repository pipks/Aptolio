import { useState } from 'react'
import WalletItem from './WalletItem';
import Modal from 'components/Modal'
import Button from 'components/Button'
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useToast } from 'hooks/useToast';

const Index = ({ text }) => {
	const [open, setOpen] = useState(false)
	const { connect, wallets } = useWallet();
	const toast = useToast()

	const connectWallet = (wallet) => {
		try {
			connect(wallet)
			localStorage.setItem('isWalletConnected', true)
			localStorage.setItem('connectedWallet', wallet)
		} catch (ex) {
			toast('error', 'oh no', ex)
		}
	}

	return (
		<div>
			<div>
				<Button onClick={() => setOpen(true)}>
					{text ? text : 'CONNECT WALLET'}
				</Button>
			</div>
			<Modal title='CONNECT WALLET' open={open} close={() => setOpen(!open)}>
				<div className='p-3'>
					<div className='flex flex-col gap-3'>
						{wallets.map((wallet) => (
							<div key={wallet.name} onClick={() => connectWallet(wallet.name)}>
								<WalletItem name={wallet.name} icon={wallet.icon} detected={wallet.readyState === 'NotDetected' ? false : true} />
							</div>
						))}
					</div>
				</div>
			</Modal>
		</div >
	);
}

export default Index