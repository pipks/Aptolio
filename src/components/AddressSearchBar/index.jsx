import React from 'react'
import Input from 'components/Input'
import { AiOutlineSearch } from 'react-icons/ai'
import { useToast } from 'hooks/useToast'
import { convertNameToAddress } from 'utils/APIs/AptosAPI'

const Index = () => {
  const toast = useToast()

  const checkAddress = async () => {
    const address = document.getElementById('aptosAddress').value
    if (address !== '') {
      if (String(address).includes('.apt')) {
        const getAddress = await convertNameToAddress(address)
        console.log(getAddress)
        if (getAddress.status === 200 && getAddress.data.hasOwnProperty('address')) {
          window.location = `/wallet/${getAddress.data.address}`
        } else {
          toast('error', 'Not Found', 'Invalid or not registered')
        }
      } else if (String(address).length > 60) {
        window.location = `/wallet/${address}`
      } else {
        toast('error', 'Wallet address or .apt name is incorrect')
      }
    } else {
      toast('error', 'Enter an APTOS wallet address or .apt name')
    }
  }

  return (
    <div className='w-full md:w-[450px]'>
      <div className='flex items-center gap-1'>
        <Input onKeyDown={e => e.key === 'Enter' && checkAddress()} id='aptosAddress' placeholder='APTOS Wallet Address or .apt name' />
        <div onClick={() => checkAddress()} className='group border-[1px] border-darkBorder p-2 rounded-lg cursor-pointer duration-200 hover:bg-primary'>
          <AiOutlineSearch className='duration-200 text-2xl text-primary  group-hover:text-darkBackground' />
        </div>
      </div>
    </div>
  )
}

export default Index