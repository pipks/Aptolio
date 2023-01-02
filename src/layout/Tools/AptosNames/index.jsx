import { useState } from 'react'
import AddressComponent from 'components/AddressComponent'
import Alert from 'components/Alerts'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import Typography from 'components/Typography'
import { useToast } from 'hooks/useToast'
import { convertAddressToName, convertNameToAddress } from 'utils/APIs/AptosAPI'

const Index = () => {
  const toast = useToast()
  const [walletData, setWalletData] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean)

  const checkData = async () => {
    const data = document.getElementById('addressOrName').value
    if (data !== '') {
      setIsLoading(true)
      setWalletData([])
      if (String(data).includes('.apt')) {
        const getAddress = await convertNameToAddress(data)
        if (getAddress.status === 200 && getAddress.data.hasOwnProperty('address')) {
          setWalletData(getAddress)
          setIsLoading(false)
        } else {
          toast('error', 'Not Found', 'Invalid or not registered')
        }
      } else if (String(data).length > 60) {
        const getName = await convertAddressToName(data)
        if (getName.status === 200 && getName.data.hasOwnProperty('name')) {
          setWalletData(getName)
          setIsLoading(false)
        } else {
          toast('error', 'Not Found', 'Invalid or not registered')
        }
      } else {
        toast('error', 'Wallet address or .apt name is incorrect')
      }
    } else {
      toast('error', 'Enter an APTOS wallet address or .apt name')
    }
    setIsLoading(false)
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full md:w-[450px]'>
        <Card title='Search wallet address or .apt name'>
          <div className='p-2'>
            <Input onKeyDown={(e) => e.key === 'Enter' && checkData()} id='addressOrName' placeholder='APTOS wallet address or .apt name' />
            <Button onClick={() => checkData()} loading={isLoading} className='mt-2'>
              Search
            </Button>
            {isLoading === false && (
              <div>
                {Object.keys(walletData).length > 0 && (
                  <div>
                    <div className='border-[1px] border-darkBorder mt-2'></div>
                    {walletData.status === 200 ? (
                      <div className='mt-2'>
                        {walletData.data.hasOwnProperty('address') && (
                          <div className='flex items-center gap-1'>
                            <Typography>Wallet Address:</Typography>
                            <AddressComponent address={walletData.data.address} type='account' showCopy={true} showOpen={true} short={true} />
                          </div>
                        )}
                        {walletData.data.hasOwnProperty('name') && (
                          <div className='flex items-center gap-1'>
                            <Typography>Name:</Typography>
                            <Typography className='hover:underline'>{walletData.data.name}.apt</Typography>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Alert variant='error' text='API connection failed! try again!' />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Index
