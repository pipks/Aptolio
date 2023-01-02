import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { AptosClient } from 'aptos'
import Button from 'components/Button'
import { MAINNET_NODE_URL } from 'config'
import { useToast } from 'hooks/useToast'
import { useState } from 'react'

const WithdrawButton = ({ data }) => {
  const { signAndSubmitTransaction } = useWallet()
  const [isLoading, setIsLoading] = useState(Boolean)
  const toast = useToast()

  const aptosClient = new AptosClient(MAINNET_NODE_URL, { WITH_CREDENTIALS: false })

  const withdrawBruh = async () => {
    setIsLoading(true)
    const payload = {
      type: 'entry_function_payload',
      function: '0xcfe80c7cfae84f1b66cd2dc65db923360acaaaa6042d9ac7c389c09e033be60e::levels::withdraw_bb',
      type_arguments: [],
      arguments: [data.name, data.property],
    }
    try {
      const response = await signAndSubmitTransaction(payload)
      const txResult = await aptosClient.waitForTransactionWithResult(response.hash)
      if (txResult.success === true) {
        toast('success', 'Transaction Confirmd Bruh', '', response.hash)
      } else {
        toast('error', 'bruh', txResult.success, response.hash)
      }
    } catch (error) {
      if (error === 'The user rejected the request') {
        toast('error', 'bruh', 'yeah thats rights')
      } else {
        toast('error', 'bruh', error)
      }
    }
    setIsLoading(false)
  }

  return (
    <div className='mt-2'>
      <Button onClick={() => withdrawBruh()} loading={isLoading}>
        WITHDRAW
      </Button>
    </div>
  )
}

export default WithdrawButton
