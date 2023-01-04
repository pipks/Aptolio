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
      function: '0xde220d873e4f5eab5859f368b86fca00fa6fd395279cf54a7d7a5020cb527391::safari::end_adventure',
      type_arguments: ['0x5d410456c28307fd31439c1658b5e6b41f4ba868d63e03598c1ddb4a7b29449::asset::SeedzCoin'],
      arguments: ['0xde220d873e4f5eab5859f368b86fca00fa6fd395279cf54a7d7a5020cb527391', data.adventure_id.creation_num],
    }
    try {
      const response = await signAndSubmitTransaction(payload)
      const txResult = await aptosClient.waitForTransactionWithResult(response.hash)
      if (txResult.success === true) {
        toast('success', 'Transaction Confirmd', '', response.hash)
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
