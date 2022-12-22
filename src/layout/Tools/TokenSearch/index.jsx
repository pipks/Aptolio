import React, { useState } from 'react'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import Button from 'components/Button'
import Alerts from 'components/Alerts'
import LoadingPulse from 'components/LoadingPulse'
import Typography from 'components/Typography'
import { shortAddress } from 'utils/Helpers'
import { searchTokensBySymbol } from 'utils/APIs/AptosAPI'

const Index = () => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const [data, setData] = useState([])

  const checkData = async () => {
    const token = document.getElementById('tokenName').value

    setIsLoading(true)
    const getData = await searchTokensBySymbol(token)
    setData(getData)
    setIsLoading(false)
  }

  return (
    <div>
      <div className='flex items-center justify-center flex-col'>
        <div className='w-full md:w-[450px]'>
          <Card title='Search Tokens'>
            <div className='p-2'>
              <Input onKeyDown={e => e.key === 'Enter' && checkData()} id='tokenName' placeholder='Search by symbols (e.g: cake)' />
              <Button onClick={() => checkData()} className='mt-2'>Search</Button>
            </div>
          </Card>
        </div>
      </div>
      <div className='mt-3'>
        <Card title='Tokens'>
          {isLoading === false ? (
            <div>
              {Object.keys(data).length > 0 && (
                <div>
                  {data.status === 200 ? (
                    <div>
                      {data.data.data.coin_infos.length > 0 ? (
                        <div>
                          <Typography className='font-light text-gray-500 px-3 py-2'>FOUND {data.data.data.coin_infos.length} TOKENS </Typography>
                          <div className='overflow-y-auto'>
                            <table className='border-collapse table-auto w-full text-sm text-left bg-darkCard'>
                              <thead className='text-gray-500 text-xs uppercase'>
                                <tr>
                                  <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                                    #
                                  </th>
                                  <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                                    Name
                                  </th>
                                  <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                                    Symbol
                                  </th>
                                  <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                                    Decimal
                                  </th>
                                  <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                                    Coin Type
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.data.data.coin_infos.map((x, index) => (
                                  <tr key={index} className='w-full cursor-pointer hover:bg-darkBorder'>
                                    <th className='border-b border-darkBorder px-6 py-4'>
                                      <Typography className='font-light text-gray-500'>{index + 1}</Typography>
                                    </th>
                                    <th className='border-b border-darkBorder px-6 py-4'>
                                      <Typography className='font-light whitespace-nowrap'>{x.name}</Typography>
                                    </th>
                                    <th className='border-b border-darkBorder px-6 py-4'>
                                      <Typography className='font-light whitespace-nowrap'>{x.symbol}</Typography>
                                    </th>
                                    <th className='border-b border-darkBorder px-6 py-4'>
                                      <Typography className='font-light whitespace-nowrap'>{x.decimals}</Typography>
                                    </th>
                                    <th className='border-b border-darkBorder px-6 py-4'>
                                      <Typography className='font-light'>{shortAddress(x.coin_type, 6)}</Typography>
                                    </th>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className='px-3 py-2'>
                          <Alerts variant='info' text='FOUND 0 TOKENS' />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='px-3 py-2'>
                      <Alerts variant='error' text='API connection failed! try again!' />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className='px-3 py-2'>
              <LoadingPulse />
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Index