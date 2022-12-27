import React from 'react'
import Input from 'components/Input'
import Card from 'components/Cards/Card'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useToast } from 'hooks/useToast'
import { convertNameToAddress } from 'utils/APIs/AptosAPI'

const Index = () => {
  const toast = useToast()
  const { account, connected } = useWallet()

  const checkAddress = async () => {
    const walletAddress = document.getElementById('aptosAddress').value
    if (walletAddress !== '') {
      if (String(walletAddress).endsWith('.apt')) {
        const getAddress = await convertNameToAddress(walletAddress)
        if (getAddress.status === 200 && getAddress.data.hasOwnProperty('address')) {
          window.location = `/address/${getAddress.data.address}`
        } else {
          toast('error', 'Not Found', 'Invalid or not registered')
        }
      } else if (String(walletAddress).length > 60) {
        window.location = `/address/${walletAddress}`
      } else {
        toast('error', 'Wallet address or .apt name is incorrect')
      }
    } else {
      toast('error', 'Enter an APTOS wallet address or .apt name')
    }
  }

  return (
    <div className='w-full md:w-[450px]'>
      <Card>
        <div className='flex items-center gap-1 p-1'>
          <Input onKeyDown={e => e.key === 'Enter' && checkAddress()} id='aptosAddress' placeholder='APTOS Wallet Address or .apt name' />
          <div onClick={() => checkAddress()} className='group border-[1px] border-darkBorder p-2 rounded-lg cursor-pointer duration-200 hover:bg-primary'>
            <AiOutlineSearch className='duration-200 text-2xl text-primary  group-hover:text-darkBackground' />
          </div>
          {connected && (
            <div onClick={() => checkAddress(account.address)} className='group border-[1px] border-darkBorder p-2 rounded-lg cursor-pointer duration-200 hover:bg-primary'>
              <p className='duration-200 text-primary group-hover:text-darkBackground text-md whitespace-nowrap'>CHECK ME</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Index