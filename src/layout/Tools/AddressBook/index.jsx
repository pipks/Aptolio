import { useState } from 'react'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import { useToast } from 'hooks/useToast'
import AddressesTable from './AddressesTable'

const Index = () => {
  const [isUpdated, setIsUpdated] = useState(0)
  const toast = useToast()

  const saveAddress = () => {
    var existingAddresses = JSON.parse(localStorage.getItem('addressBook'))
    if (existingAddresses === null) existingAddresses = []

    const getWalletName = document.getElementById('walletName').value
    const getWalletAddress = document.getElementById('walletAddress').value

    if (getWalletName !== '') {
      if (getWalletAddress !== '') {
        const result = { walletName: getWalletName, walletAddress: getWalletAddress }
        localStorage.setItem('entry', JSON.stringify(result))
        existingAddresses.push(result)
        localStorage.setItem('addressBook', JSON.stringify(existingAddresses))
        setIsUpdated(isUpdated + 1)
      } else {
        toast('error', 'Enter wallet address')
      }
    } else {
      toast('error', 'Enter name')
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full md:w-[500px] space-y-2'>
        <Card title='Add Address'>
          <div className='p-2'>
            <div className='mt-2'>
              <Input id='walletName' placeholder='Wallet Name' />
            </div>
            <div className='mt-2'>
              <Input id='walletAddress' placeholder='Wallet Address' />
            </div>
            <div className='mt-2'>
              <Button onClick={() => saveAddress()}>ADD WALET</Button>
            </div>
          </div>
        </Card>
        <AddressesTable updated={isUpdated} />
      </div>
    </div>
  )
}

export default Index
