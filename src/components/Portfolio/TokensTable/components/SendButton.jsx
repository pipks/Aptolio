import React, { useState } from 'react'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Input from 'components/Input'
import Typography from 'components/Typography'
import AddressResult from './AddressResult'
import BigNumber from 'bignumber.js'
import Alert from 'components/Alerts'
import { AptosClient } from 'aptos'
import { useToast } from 'hooks/useToast'
import { checkAddress, getTokenLogo } from '../Helper'
import { shortAddress } from 'utils/Helpers'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { MAINNET_NODE_URL } from 'config'

const SendButton = ({ data, ...rest }) => {
  const { signAndSubmitTransaction } = useWallet()
  const [open, setOpen] = useState(false)
  const [addressData, setAddressData] = useState([])
  const [sendTokenAmount, setTokenAmount] = useState(0)
  const [sendingTokenData, setSendingTokenData] = useState([])
  const toast = useToast()
  const aptosClient = new AptosClient(MAINNET_NODE_URL, { WITH_CREDENTIALS: false, })

  const setMaxAmount = () => {
    document.getElementById('tokenAmount').value = data.amount / 10 ** data.coin_info.decimals
  }

  const handleTokenAmount = () => {
    setTokenAmount(0)
    setSendingTokenData([])
    const sendingAmount = document.getElementById('tokenAmount').value
    if (Number(sendingAmount) > Number(data.amount) / 10 ** data.coin_info.decimals) {
      setSendingTokenData({ status: 'error', text: 'Insufficient balance' })
    } else {
      setSendingTokenData([])
      setTokenAmount(Number(sendingAmount))
    }
  }

  const handleCheckAddress = async () => {
    setAddressData([])
    const walletAddress = document.getElementById('receiverAddress').value
    if (walletAddress !== '') {
      const getData = await checkAddress(walletAddress, data)
      setAddressData(getData)
    } else {
      toast('error', 'Enter APTOS wallet address or .apt name')
    }
  }

  const sendTransactions = async () => {
    const getAmount = document.getElementById('tokenAmount').value
    const format = new BigNumber(getAmount).multipliedBy(new BigNumber(10).pow(data.coin_info.decimals))
    const result = new BigNumber(format)
    const payload = {
      type: 'entry_function_payload',
      function: '0x1::coin::transfer',
      type_arguments: [data.coin_info.coin_type],
      arguments: [addressData.address, result.c[0]]
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      const txResult = await aptosClient.waitForTransactionWithResult(response.hash);
      if (txResult.success === true) {
        toast('success', 'Transaction Confirmd', `Sent ${getAmount} ${data.coin_info.symbol} to ${shortAddress(addressData.address, 4)}`, response.hash)
      } else {
        toast('error', 'oh no', txResult.success, response.hash)
      }
    } catch (error) {
      if (error === 'The user rejected the request') {
        toast('error', 'oh no', 'The user rejected the request')
      } else {
        toast('error', 'oh no', error)
      }
    }

  }

  return (
    <div>
      <Button {...rest} onClick={() => setOpen(!open)} className='font-light'>
        SEND
      </Button>
      <Modal title={`SEND ${String(String(data.coin_info.symbol).toUpperCase()).toUpperCase()}`} open={open} close={() => setOpen(!open)}>
        <div className='p-2'>
          <div className='flex gap-2 mb-2'>
            <img src={getTokenLogo(data.coin_type)} alt={data.coin_info.symbol} className='w-12 rounded-full' />
            <div className='flex flex-col'>
              <Typography className='uppercase'>{data.coin_info.symbol}</Typography>
              <div className='flex flex-row gap-1'>
                <p className='text-gray-600'>Balance:</p>
                <p className='text-gray-400'>{data.amount / 10 ** data.coin_info.decimals}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-1'>
              <Input id='tokenAmount' onChange={() => handleTokenAmount()} placeholder='Amount' />
              <Button onClick={() => setMaxAmount()}>MAX</Button>
            </div>
            {Object.keys(sendingTokenData).length > 0 && sendingTokenData.status === 'error' && (
              <Alert variant={sendingTokenData.status} text={sendingTokenData.text} />
            )}
            <Input onChange={() => handleCheckAddress()} id='receiverAddress' placeholder='Receiver or .apt name' />
            {Object.keys(addressData).length > 0 && (
              <div>
                {addressData.status === 'error' && (
                  <div>
                    {addressData.hasOwnProperty('tokenBalance') ? (
                      <AddressResult variant={addressData.status} text={addressData.error} balance={addressData.tokenBalance} />
                    ) : (
                      <AddressResult variant={addressData.status} text={addressData.error} />
                    )}
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
            <Button disabled={addressData.status === 'success' && Number(sendTokenAmount) > 0 ? false : true} onClick={() => sendTransactions()}>SEND</Button>
          </div>
        </div>
      </Modal >
    </div >
  )
}

export default SendButton