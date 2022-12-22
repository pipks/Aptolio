import React from 'react'
import Avatar from 'components/Avatar'

const WalletItem = ({ name, icon, detected }) => {
  return (
    <button disabled={!detected} className='w-full flex items-center p-3 gap-2 rounded-lg duration-200 bg-darkBackground hover:bg-darkBorder cursor-pointer disabled:cursor-not-allowed disabled:opacity-30'>
      <Avatar src={icon} alt='' className='w-5 rounded-full' />
      <div className='flex items-center justify-between w-full'>
        <p className='text-white font-light'>{name}</p>
        <p className='text-gray-700 font-light text-sm'>{detected ? 'Detected' : ''}</p>
      </div>
    </button>
  )
}

export default WalletItem