import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import LoadingPulse from 'components/LoadingPulse'
import { getCoinData } from 'utils/APIs/CoinGeckoAPI'

const Index = ({ data }) => {
  const [aptPrice, setAptPrice] = useState([])
  const getAPTPrice = async () => {
    const getPrice = await getCoinData('aptos')
    setAptPrice(getPrice)
  }

  useEffect(() => {
    if (Object.keys(data).length > 0 && data.status === 200) {
      getAPTPrice()
    }

  }, [data])

  return (
    <div>
      <Card title='APT Balance'>
        {Object.keys(data).length > 0 ? (
          <div className='p-3'>
            {data.status === 200 ? (
              <div className='flex flex-row items-center gap-1 whitespace-nowrap'>
                {data.data.data.current_coin_balances.length > 0 ? (
                  <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
                    <Typography className='text-2xl font-light'>
                      {Number(data.data.data.current_coin_balances[0].amount / 10 ** 8).toLocaleString('en-US')} APT
                    </Typography>
                    {Object.keys(aptPrice).length > 0 && aptPrice.status === 200 && (
                      <div>
                        <Typography className='text-2xl font-light'>
                          (${Number(Number(aptPrice.data.market_data.current_price.usd) * Number(data.data.data.current_coin_balances[0].amount / 10 ** 8)).toLocaleString('en-US')})
                        </Typography>
                      </div>
                    )}
                  </div>
                ) : (
                  <Typography className='text-2xl font-light'>0 APT</Typography>
                )}
              </div>
            ) : (
              <Alert variant='error' text='API connection failed! try again!' />
            )}
          </div>
        ) : (
          <div className='p-3'>
            <LoadingPulse />
          </div>
        )}
      </Card>
    </div>
  )
}

export default Index