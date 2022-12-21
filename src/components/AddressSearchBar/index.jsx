import React from 'react'
import Input from 'components/Input'
import { AiOutlineSearch } from 'react-icons/ai'

const Index = () => {

  const checkAddress = () => {
    const address = document.getElementById('aptosAddress').value
    window.location = `/wallet/${address}`
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