import { useState } from 'react'
import Modal from 'components/Modal'
import Typtography from 'components/Typography'
import Button from 'components/Button'
import { useToast } from 'hooks/useToast'
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FiExternalLink, FiCopy } from 'react-icons/fi'
import { getExplorerURL, shortAddress } from 'utils/Helpers'

export default function DisconnectButton() {
	const [open, setOpen] = useState(false)
	const { account, disconnect } = useWallet();
	const toast = useToast()
	const connectedWallet = localStorage.getItem('connectedWallet')
	const walletDisconnect = () => {
		try {
			disconnect();
			localStorage.setItem('isWalletConnected', false);
			window.location.reload();
		} catch (ex) {
			toast('error', 'oh no', ex)
		}
	}

	return (
		<div>
			<div className='flex items-center gap-2'>
				<Button onClick={() => setOpen(true)} className='uppercase'>
					{shortAddress(account.address, 6)}
				</Button>
			</div>
			<Modal title='Your Wallet' open={open} close={() => setOpen(!open)}>
				<div className='p-3'>
					<div className='border border-darkBorder w-full rounded-xl p-3'>
						<Typtography className='text-sm font-semibold'>Connected Wallet - {connectedWallet}</Typtography>
						<div className='flex items-center p-2 mt-2 mb-2 rounded-lg bg-darkBorder'>
							<p className='text-darkText font-bold text-sm'>{shortAddress(account.address, 10)}</p>
						</div>
						<div className='flex items-center justify-between gap-3'>
							<div className='flex items-center gap-1 text-darkText font-semibold'>
								<FiExternalLink className='mb-1' />
								<a href={getExplorerURL('account', account.address)} target='_blank' rel='noreferrer' className='flex items-center gap-1 duration-150 cursor-pointer text-sm'>View on explorer</a>
							</div>
							<div onClick={() => navigator.clipboard.writeText(account.address)} className='flex items-center gap-1 text-darkText font-semibold cursor-pointer'>
								<FiCopy className='mb-1' />
								<p className='text-sm text-darkText'>Copy</p>
							</div>
						</div>
					</div>
					<div className='flex flex-row gap-2 justify-end mt-3'>
						<Button onClick={() => setOpen(!open)}>CLOSE</Button>
						<Button onClick={() => walletDisconnect()} className='bg-red-500 hover:bg-red-800'>DISCONNECT</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}