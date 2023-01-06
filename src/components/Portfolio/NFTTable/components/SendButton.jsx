import { useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { AptosClient } from 'aptos'
import AddressBookButton from 'components/AddresBookButton'
import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import NFTImage from './NFTImage'
import AddressResult from 'components/Portfolio/TokensTable/components/AddressResult'
import { checkAddress } from 'components/Portfolio/TokensTable/Helper'
import Typography from 'components/Typography'
import { MAINNET_NODE_URL } from 'config'
import { useToast } from 'hooks/useToast'
import { shortAddress } from 'utils/Helpers'

const SendButton = ({ data, ...rest }) => {
  const { signAndSubmitTransaction } = useWallet()
  const [open, setOpen] = useState(false)
  const [addressData, setAddressData] = useState([])
  const toast = useToast()
  const aptosClient = new AptosClient(MAINNET_NODE_URL, { WITH_CREDENTIALS: false })

  const handleCheckAddress = async () => {
    setAddressData([])
    const walletAddress = document.getElementById('receiverAddress').value
    if (walletAddress !== '') {
      const getData = await checkAddress(walletAddress, data)
      setAddressData(getData)
    }
  }

  const sendTransaction = async () => {
    const payload = {
      type: 'entry_function_payload',
      function: '0x424abce72523e9c02898d3c8eaf9a632f22b7c92ccce2568c4ea47a5c43dfce7::token::transfer_with_opt_in',
      type_arguments: [],
      arguments: [data.creator, data.collection_name, data.token_name, data.property_version, addressData.address, 1],
    }
    try {
      const response = await signAndSubmitTransaction(payload)
      const txResult = await aptosClient.waitForTransactionWithResult(response.hash)
      if (txResult.success === true) {
        setOpen(!open)
        setAddressData([])
        toast('success', 'Transaction Confirmd', `Sent ${data.token_name} to ${shortAddress(addressData.address, 4)}`, response.hash)
      } else {
        toast('error', '', txResult.success, response.hash)
      }
    } catch (error) {
      if (error === 'The user rejected the request') {
        toast('error', 'The user rejected the request', '')
      } else {
        toast('error', error, '')
      }
    }
  }

  return (
    <div className='mt-1'>
      <Button {...rest} className='font-light' onClick={() => setOpen(!open)}>
        SEND
      </Button>
      <Modal title={`SEND ${String(data.token_name).toUpperCase()}`} open={open} close={() => setOpen(!open)}>
        <div className='p-2'>
          <div className='flex flex-col gap-2 mb-2'>
            <div className='flex items-center justify-center'>
              <NFTImage nftData={data} type='sending' />
            </div>
            <div className='text-center'>
              <Typography className='uppercase'>{data.token_name}</Typography>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-1'>
              <Input onChange={() => handleCheckAddress()} id='receiverAddress' placeholder='Receiver or .apt name' />
              <AddressBookButton inputId='receiverAddress' />
            </div>
            {Object.keys(addressData).length > 0 && (
              <div>
                {addressData.status === 'error' && (
                  <div>
                    {addressData.hasOwnProperty('tokenBalance') ? <AddressResult variant={addressData.status} text={addressData.error} balance={addressData.tokenBalance} /> : <AddressResult variant={addressData.status} text={addressData.error} />}
                  </div>
                )}
                {addressData.status === 'success' && (
                  <div>
                    {addressData.hasOwnProperty('tokenBalance') ? (
                      <AddressResult variant={addressData.status} text={shortAddress(addressData.address, 6)} balance={addressData.tokenBalance} />
                    ) : (
                      <AddressResult variant={addressData.status} text={shortAddress(addressData.address, 6)} />
                    )}
                  </div>
                )}
              </div>
            )}
            <Button onClick={() => sendTransaction()} disabled={addressData.status === 'success' ? false : true}>
              SEND
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SendButton
