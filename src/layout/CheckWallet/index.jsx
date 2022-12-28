import React, { useState, useEffect } from 'react'
import AddressSearchBar from 'components/AddressSearchBar'
import Alert from 'components/Alerts'
import { useLocation } from 'react-router-dom';
import { APTBalanceCard, UserTXsCount, UserTokensCount, UserNFTsCount, UserTokensTable, UserNFTsTable, UserTxsTable } from 'components/WalletComponents';
import { getWalletAPTBalance, getWalletTransactionsCount, getWalletTokensBalance, getWalletNFTsBalance, getWalletTransactions } from 'utils/APIs/AptosAPI';

const Index = () => {
  const location = useLocation();
  const { pathname } = location;
  const walletAddress = pathname.split('/').slice(1)[1];
  const [userAPTBalance, setUserAPTBalance] = useState([])
  const [userTXsCount, setUserTXsCount] = useState([])
  const [userTokens, setUserTokens] = useState([])
  const [userNFTs, setUserNFTs] = useState([])
  const [userTxs, setUserTxs] = useState([])

  const getWalletData = async () => {
    if (walletAddress !== undefined) {
      document.getElementById('aptosAddress').value = walletAddress
      setUserAPTBalance([])
      setUserTXsCount([])
      setUserTokens([])
      setUserNFTs([])
      setUserTxs([])
      const getWalletAPT = await getWalletAPTBalance(walletAddress)
      const getTxsCount = await getWalletTransactionsCount(walletAddress)
      const getTokens = await getWalletTokensBalance(walletAddress)
      const getNFTs = await getWalletNFTsBalance(walletAddress)
      const getTxs = await getWalletTransactions(walletAddress)
      setUserAPTBalance(getWalletAPT)
      setUserTXsCount(getTxsCount)
      setUserTokens(getTokens)
      setUserNFTs(getNFTs)
      setUserTxs(getTxs)
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
            <APTBalanceCard data={userAPTBalance} />
            <UserTokensCount data={userTokens} />
            <UserNFTsCount data={userNFTs} />
            <UserTXsCount data={userTXsCount} />
          </div>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-2'>
              <UserTokensTable data={userTokens} />
              <UserNFTsTable data={userNFTs} />
            </div>
            <UserTxsTable data={userTxs} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Index