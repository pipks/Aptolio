import React from 'react'
import Input from 'components/Input'
import { AiOutlineSearch } from 'react-icons/ai'
import { useToast } from 'hooks/useToast'

const Index = () => {
  const toast = useToast()

  const checkAddress = () => {
    const address = document.getElementById('aptosAddress').value
    if (address !== '') {
      window.location = `/wallet/${address}`
    } else {
      toast('error', 'Enter an APTOS wallet address or .apt name')
    }
  }

  return (
    <div className='w-full md:w-[450px]'>
      <div className='flex items-center gap-1'>
        <Input id='aptosAddress' placeholder='APTOS Wallet Address' />
        <div onClick={() => checkAddress()} className='group border-[1px] border-darkBorder p-2 rounded-lg cursor-pointer duration-200 hover:bg-primary'>
          <AiOutlineSearch className='duration-200 text-2xl text-primary  group-hover:text-darkBackground' />
        </div>
      </div>
    </div>
  )
}

export default Index