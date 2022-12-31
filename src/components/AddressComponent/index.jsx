import { useToast } from 'hooks/useToast'
import { BiCopy } from 'react-icons/bi'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { getExplorerURL, shortAddress } from 'utils/Helpers'

const AddressComponent = ({ address, type, showCopy, showOpen, short }) => {
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
        {short === true ? <p className='text-md text-white font-light hover:underline'>{shortAddress(address, 6)}</p> : <p className='text-md text-white font-light hover:underline'>{address}</p>}
        {showOpen && <MdOutlineOpenInNew className='text-md text-primary' />}
      </a>
      {showCopy && (
        <div onClick={() => copyData()} className='flex'>
          <BiCopy className='text-md text-primary cursor-pointer' />
        </div>
      )}
    </div>
  )
}

export default AddressComponent
