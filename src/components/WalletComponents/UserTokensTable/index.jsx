import React from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import LoadingPulse from 'components/LoadingPulse'
import { getTokenLogo } from 'components/Portfolio/TokensTable/Helper'
import { shortAddress } from 'utils/Helpers'

const index = ({ data }) => {
  console.log(data)
  return (
    <div>
      <Card title='Tokens' variant='collapsible'>
        {Object.keys(data).length > 0 ? (
          <div>
            {data.status === 200 ? (
              <div className='max-h-[500px] overflow-y-auto rounded-lg'>
                {data.data.data.current_coin_balances.length > 0 ? (
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
                          Balance
                        </th>
                        <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                          Coin Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.data.current_coin_balances.map((x, index) => (
                        <tr key={index} className='w-full cursor-pointer hover:bg-darkBorder'>
                          <th className='border-b border-darkBorder px-6 py-4'>
                            <Typography className='font-light text-gray-500'>{index + 1}</Typography>
                          </th>
                          <th className='border-b border-darkBorder px-6 py-4'>
                            <div className='flex items-center gap-2'>
                              <img
                                src={getTokenLogo(x.coin_info.coin_type)}
                                alt='Logo'
                                className='rounded-full w-[36px] h-[36px] ' />
                              <div className='flex flex-col'>
                                <Typography className='font-light whitespace-nowrap'>{x.coin_info !== null ? x.coin_info.name : '-'}</Typography>
                                <Typography className='font-light whitespace-nowrap text-sm ' color='text-gray-500'>{x.coin_info !== null ? x.coin_info.symbol : '-'}</Typography>
                              </div>
                            </div>
                          </th>
                          <th className='border-b border-darkBorder px-6 py-4'>
                            {x.coin_info !== null ? (
                              <Typography className='font-light'>
                                {Number(x.amount / 10 ** x.coin_info.decimals).toLocaleString('en-US')}
                              </Typography>
                            ) : (
                              <Typography className='font-light'>
                                -
                              </Typography>
                            )}
                          </th>
                          <th className='border-b border-darkBorder px-6 py-4'>
                            <div className='flex'>
                              <div className='bg-[#192C32] px-3 py-1 rounded-lg'>
                                <Typography className='font-light'>{x.coin_info !== null ? shortAddress(x.coin_info.coin_type, 6) : '-'}</Typography>
                              </div>
                            </div>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className='p-3'>
                    <Alert variant='warning' text='User has no tokens' />
                  </div>
                )}
              </div>
            ) : (
              <div className='p-3'>
                <Alert variant='error' text='API connection failed! try again!' />
              </div>
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

export default index