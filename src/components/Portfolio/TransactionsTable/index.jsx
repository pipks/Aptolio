import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import TransctionsTable from './Table'
import { getWalletTransactionsCount, getUserTransactions } from 'utils/APIs/AptosAPI';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const Index = () => {
  const { account } = useWallet()
  const [walletTxs, setWalletTxs] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getTransactions = async (limit) => {
    setIsLoading(true)
    setWalletTxs([])
    const getWalletTransactions = await getUserTransactions(account.address, limit, offset)
    setWalletTxs(getWalletTransactions)
    setIsLoading(false)
  }

  const changePage = (e) => {
    setOffset(e.selected * 25)
  };

  const txCount = async () => {
    const getTxsCount = await getWalletTransactionsCount(account.address)
    if (Object.keys(getTxsCount).length > 0 && getTxsCount.status === 200) {
      if (getTxsCount.data.data.move_resources_aggregate.aggregate.hasOwnProperty('count')) {
        setPageCount(Math.ceil(getTxsCount.data.data.move_resources_aggregate.aggregate.count / 25))
      }
    }
  }

  useEffect(() => {
    txCount()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getTransactions(25)
    // eslint-disable-next-line
  }, [offset])

  return (
    <div>
      <TransctionsTable walletAddress={account.address} data={walletTxs} isLoading={isLoading} />
      <div className='flex items-center justify-center mt-3 mb-3'>
        <div>
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={pageCount}
            onPageChange={(e) => changePage(e)}
            containerClassName={"pagination flex flex-row gap-2 text-white"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
    </div>
  )
}

export default Index