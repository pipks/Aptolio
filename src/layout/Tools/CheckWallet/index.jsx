import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import AddressSearchBar from 'components/AddressSearchBar';
import { NFTTable, StatisticCard, TokenTable, Transactions } from 'components/Portfolio';
import { useLocation } from 'react-router-dom';
import { getWalletAPTBalance, getWalletNFTsBalance, getWalletTokensBalance, getWalletTransactionsCount } from 'utils/APIs/AptosAPI';

const Index = () => {
  const { account, connected } = useWallet()
  const location = useLocation();
  const { pathname } = location;
  const walletAddress = pathname.split('/').slice(1)[1];
  const [isLoading, setIsLoading] = useState(true)
  const [userAPTBalance, setUserAPTBalance] = useState([])
  const [userTXsCount, setUserTXsCount] = useState([])
  const [userTokens, setUserTokens] = useState([])
  const [userNFTs, setUserNFTs] = useState([])

  const getWalletData = async () => {
    if (walletAddress !== undefined) {
      setIsLoading(true)
      document.getElementById('aptosAddress').value = walletAddress
      setUserAPTBalance([])
      setUserTXsCount([])
      setUserTokens([])
      setUserNFTs([])
      const getWalletAPT = await getWalletAPTBalance(walletAddress)
      const getTxsCount = await getWalletTransactionsCount(walletAddress)
      const getTokens = await getWalletTokensBalance(walletAddress)
      const getNFTs = await getWalletNFTsBalance(walletAddress)
      setUserAPTBalance(getWalletAPT)
      setUserTXsCount(getTxsCount)
      setUserTokens(getTokens)
      setUserNFTs(getNFTs)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getWalletData()
    // eslint-disable-next-line
  }, [walletAddress])

  return (
    <div>
      <div className='flex items-center justify-center mb-3'>
        <AddressSearchBar />
      </div>
      {walletAddress !== undefined && (
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols3 lg:grid-cols-4 gap-2'>
            <StatisticCard title='APT Balance' data={userAPTBalance} isLoading={isLoading} />
            <StatisticCard title='Tokens' data={userTokens} isLoading={isLoading} />
            <StatisticCard title='NFTs' data={userNFTs} isLoading={isLoading} />
            <StatisticCard title='Transactions' data={userTXsCount} isLoading={isLoading} />
          </div>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-2'>
              <TokenTable tokensBalance={userTokens} isChecking={true} isConnectedWallet={connected ? walletAddress === account.address ? true : false : false} />
              <NFTTable isChecking={true} data={userNFTs} />
            </div>
            <div className='mt-2'>
              <Transactions walletAddress={walletAddress} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Index