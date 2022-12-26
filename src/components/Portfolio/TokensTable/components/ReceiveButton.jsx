import React, { useState } from 'react'
import Button from 'components/Button'
import Typography from 'components/Typography'
import Modal from 'components/Modal'
import QRCode from 'react-qr-code'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { shortAddress } from 'utils/Helpers'
import { useToast } from 'hooks/useToast'

const SendButton = ({ data }) => {
  const { account } = useWallet()
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const copyData = () => {
    try {
      navigator.clipboard.writeText(account.address)
      toast('success', 'Copied', `Wallet Address: ${shortAddress(account.address, 6)}`)
    } catch {
      toast('error', 'oh no', `WTF MAN`)
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(!open)} className='font-light'>
        RECEIVE
      </Button>
      <Modal title={`RECEIVE ${String(data.coin_info.symbol).toUpperCase()}`} open={open} close={() => setOpen(!open)} >
        <div className='p-2'>
          <div className='flex items-center justify-center '>
            <div className='mb-2 bg-darkBorder p-2 rounded-lg'>
              <QRCode
                size={256}
                style={{ maxWidth: "100%", width: "100%", borderRadius: '5px' }}
                value={account.address}
                viewBox={`0 0 256 256`}
                bgColor='#00BEA4'
                fgColor='#131715'
              />
            </div>
          </div>
          <p className='text-gray-600 text-center'>Your Address</p>
          <div className='flex items-center gap-2'>
            <div className='bg-darkBorder p-2 rounded-lg overflow-y-auto'>
              <Typography>{account.address}</Typography>
            </div>
          </div>
          <div className=''>
            <div className='flex justify-center gap-2 mt-2'>
              <Button onClick={() => setOpen(!open)} className='duration-200 bg-red-600 hover:bg-red-800'>
                CLOSE
              </Button>
              <Button onClick={() => copyData()}>
                COPY ADDRESS
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SendButton