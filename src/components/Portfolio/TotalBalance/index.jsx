import { useEffect, useState } from 'react'
import Card from 'components/Cards/Card'
import LoadingPulse from 'components/LoadingPulse'
import Typography from 'components/Typography'
import { getTokensPrice } from 'utils/APIs/CoinGeckoAPI'
import { getNFTsUsdValue } from 'utils/APIs/TopazAPI'
import { BiDollar } from 'react-icons/bi'

const Index = ({ nftBalances, tokensBalance }) => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const [totalUsd, setTotalUsd] = useState(0)

  const getPrices = async () => {
    setIsLoading(true)

    const nftsUSD = await getNFTsUsdValue(nftBalances)
    const tokensUSD = await getTokensPrice(tokensBalance)
    const usdValue = nftsUSD + tokensUSD
    setTotalUsd(usdValue)

    setIsLoading(false)
  }

  useEffect(() => {
    getPrices()
    // eslint-disable-next-line
  }, [nftBalances, tokensBalance])

  return (
    <div>
      <Card>
        <div className='p-2'>
          <div className='flex justify-between items-center'>
            <div>
              <Typography color='text-gray-600 text-sm'>Total Balance</Typography>
              {!isLoading ? (
                <div>
                  <Typography className='text-2xl'>${totalUsd.toLocaleString('en-US')}</Typography>
                </div>
              ) : (
                <div>
                  <LoadingPulse />
                </div>
              )}
            </div>
            <div className='w-12 h-12 bg-darkBackground rounded-lg border-[1px] border-primary/20 flex items-center justify-center'>
              <BiDollar className='text-white text-2xl font-bold' />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Index
