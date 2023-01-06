import { useEffect, useState } from 'react'
import AddressSearchBar from 'components/AddressSearchBar'
import BlockchainStatCard from 'components/BlockchainStatsComponents'
import PriceWidget from 'components/PriceWidget'
import Typography from 'components/Typography'
import { getBlockchainStats } from 'utils/APIs/AptosAPI'

const Index = () => {
  const [blockchainData, setBlockchainData] = useState([])

  const getAptosData = async () => {
    const data = await getBlockchainStats()
    setBlockchainData(data)
  }

  useEffect(() => {
    getAptosData()
  }, [])

  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <Typography className='text-3xl md:text-5xl font-bold'>Aptos Portfolio Tracker</Typography>
        <Typography className='text-xl md:text-3xl font-normal text-center mt-5'>Connect a wallet or simply search for a wallet address</Typography>
      </div>
      <div className='flex items-center justify-center mt-5'>
        <AddressSearchBar />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-5'>
        <BlockchainStatCard title='Total Supply' data={blockchainData} type='supply' />
        <BlockchainStatCard title='Actively Staked' data={blockchainData} type='staked' />
        <BlockchainStatCard title='TPS' data={blockchainData} type='tps' />
        <BlockchainStatCard title='Active Validators' data={blockchainData} type='validators' />
      </div>
      <div className='mt-2 md:mt-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
          <PriceWidget coin='aptos' />
          <PriceWidget coin='bitcoin' />
          <PriceWidget coin='ethereum' />
          <PriceWidget coin='tether' />
        </div>
      </div>
    </div>
  )
}

export default Index
