import { useEffect, useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { Tab } from '@headlessui/react'
import Alert from 'components/Alerts'
import AptosMonkeysJungle from 'components/EcosystemProjects/AptosMonkeys'
import BruhBearsTaverns from 'components/EcosystemProjects/BruhBears'
import { NFTTable, StatisticCard, TokenTable, Transactions } from 'components/Portfolio'
import ConnectButton from 'components/WalletConnection/ConnectButton'
import { getWalletAPTBalance, getWalletNFTsBalance, getWalletTokensBalance, getWalletTransactionsCount } from 'utils/APIs/AptosAPI'

const Index = () => {
  const { account, connected } = useWallet()
  const [isLoading, setIsLoading] = useState(Boolean)
  const [aptBalance, setAptBalance] = useState([])
  const [coinBalances, setCoinBalances] = useState([])
  const [nftBalances, setNftBalances] = useState([])
  const [txsCount, setTxsCount] = useState([])

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  const getUserData = async () => {
    setIsLoading(true)
    setAptBalance([])
    setCoinBalances([])
    setNftBalances([])
    const getAptBalance = await getWalletAPTBalance(account.address)
    const getCoinBalance = await getWalletTokensBalance(account.address)
    const getNFTsBalance = await getWalletNFTsBalance(account.address)
    const getTxsCount = await getWalletTransactionsCount(account.address)
    setAptBalance(getAptBalance)
    setCoinBalances(getCoinBalance)
    setNftBalances(getNFTsBalance)
    setTxsCount(getTxsCount)
    setIsLoading(false)
  }

  useEffect(() => {
    if (connected) {
      getUserData()
    }
    // eslint-disable-next-line
  }, [connected])

  return (
    <div>
      {connected === true ? (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
            <StatisticCard title='APT Balance' data={aptBalance} isLoading={isLoading} />
            <StatisticCard title='Tokens' data={coinBalances} isLoading={isLoading} />
            <StatisticCard title='NFTs' data={nftBalances} isLoading={isLoading} />
            <StatisticCard title='Transactions' data={txsCount} isLoading={isLoading} />
          </div>
          <div className='mt-2'>
            <div>
              <Tab.Group>
                <div className='flex items-center justify-start'>
                  <Tab.List className="flex p-1 gap-1 rounded-lg bg-darkCard w-full md:w-[450px] border border-darkBorder overflow-y-auto">
                    <Tab className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium text-white ', selected ? 'bg-primary shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white')}>
                      STAKED NFTs
                    </Tab>
                    <Tab className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium text-white ', selected ? 'bg-primary shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white')}>
                      Tokens
                    </Tab>
                    <Tab className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium text-white', selected ? 'bg-primary shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white')}>
                      NFTs
                    </Tab>
                    <Tab className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium text-white', selected ? 'bg-primary shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white')}>
                      Transactions
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels className='mt-2'>
                  <Tab.Panel>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                      <AptosMonkeysJungle walletAddress={account.address} />
                      <BruhBearsTaverns walletAddress={account.address} />
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <TokenTable tokensBalance={coinBalances} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <NFTTable data={nftBalances} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Transactions walletAddress={account.address} />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          <Alert variant='info'>
            <p className='text-lightText text-sm w-full font-light text-teal-400'>Please connect your wallet to continue!</p>
            <div className='mt-2'>
              <ConnectButton />
            </div>
          </Alert>
        </div>
      )}
    </div>
  )
}

export default Index