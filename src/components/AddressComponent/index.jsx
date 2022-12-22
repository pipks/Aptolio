import React from 'react'
import { getExplorerURL, shortAddress } from 'utils/Helpers'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { BiCopy } from 'react-icons/bi'
import { useToast } from 'hooks/useToast'

const AddressComponent = ({ address, type, }) => {

  const toast = useToast()

  const copyData = () => {
    let addressType = ''
    if (type === 'account') {
      addressType = 'Wallet Address:'
    } else if (type === 'token') {
      addressType = 'Contract Address:'
    } else if (type === 'tx') {
      addressType = 'TX Hash:'
    } else {
      addressType = ''
    }

    try {
      navigator.clipboard.writeText(address)
      toast('success', 'Copied', `${addressType} ${shortAddress(address, 12)}`)
    } catch (error) {
      toast('error', 'failed')
    }
  }

  return (
    <div className='flex items-center gap-1'>
      <a href={getExplorerURL(type, address)} target='_blank' rel='noreferrer' className='flex items-center gap-1'>
        <p className='text-md text-primary font-light hover:underline'>{shortAddress(address, 4)}</p>
        <MdOutlineOpenInNew className='text-md text-primary' />
      </a>
      <div onClick={() => copyData()} className='flex'>
        <BiCopy className='text-md text-primary cursor-pointer' />
      </div>
    </div>
  )
}

export default AddressComponent