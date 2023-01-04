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
      function: '0x1f03a48de7dc0a076d275ebdeb0d80289b5a84a076dbf44fab69f38946de4115::steak::user_unstake_tokens',
      type_arguments: ['0x1f03a48de7dc0a076d275ebdeb0d80289b5a84a076dbf44fab69f38946de4115::steak::FlyCoin'],
      arguments: ['0x1f03a48de7dc0a076d275ebdeb0d80289b5a84a076dbf44fab69f38946de4115', [data], 'Aptos Toad Overload'],
    }
    try {
      const response = await signAndSubmitTransaction(payload)
      const txResult = await aptosClient.waitForTransactionWithResult(response.hash)
      if (txResult.success === true) {
        toast('success', 'Transaction Confirmd', '', response.hash)
      } else {
        toast('error', 'oh no', txResult.success, response.hash)
      }
    } catch (error) {
      if (error === 'The user rejected the request') {
        toast('error', 'oh no', error)
      } else {
        toast('error', 'oh no', error)
      }
    }
    setIsLoading(false)
  }

  return (
    <div className='mt-2'>
      <Button onClick={() => withdrawBruh()} loading={isLoading} className='font-light'>
        WITHDRAW
      </Button>
    </div>
  )
}

export default WithdrawButton
