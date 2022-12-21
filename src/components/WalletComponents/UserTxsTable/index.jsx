import React from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import LoadingPulse from 'components/LoadingPulse'
import { formatTimestamp, getAddressFromFunctionId, getFunctionFromFunctionId, shortAddress } from 'utils/Helpers'

const Index = ({ data }) => {
  return (
    <div className='mt-2'>
      <div className='max-h-[500px] overflow-y-auto rounded-lg'>
        <Card title='Transactions' variant='collapsible'>
          {Object.keys(data).length > 0 ? (
            <div>
              {data.status === 200 ? (
                <div className=''>
                  {data.data.data.user_transactions.length > 0 ? (
                    <div className='overflow-y-auto'>
                      <table className='border-collapse table-auto w-full text-sm text-left bg-darkCard'>
                        <thead className='text-gray-500 text-xs uppercase'>
                          <tr>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              Version
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              Timestamp
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              Sender
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              Sent To
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              Function
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.data.data.user_transactions.map((x, index) => (
                            <tr key={index} className='w-full cursor-pointer hover:bg-darkBorder'>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <Typography className='font-light' color='text-primary'>{x.version}</Typography>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <Typography className='font-light whitespace-nowrap'>{formatTimestamp(x.timestamp)}</Typography>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <div className='flex'>
                                  <div className='bg-[#363A39] px-3 py-1 rounded-lg'>
                                    <Typography className='font-light'>{shortAddress(x.sender, 5)}</Typography>
                                  </div>
                                </div>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <div className='flex'>
                                  <div className='bg-[#363A39] px-3 py-1 rounded-lg'>
                                    <Typography className='font-light'>{shortAddress(getAddressFromFunctionId(x.entry_function_id_str), 5)}</Typography>
                                  </div>
                                </div>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <div className='flex'>
                                  <div className='bg-[#192C32] px-3 py-1 rounded-lg'>
                                    <Typography className='font-light whitespace-nowrap'>{getFunctionFromFunctionId(x.entry_function_id_str)}</Typography>
                                  </div>
                                </div>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className='p-3'>
                      <Alert variant='warning' text='User has no transactions' />
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
    </div>
  )
}

export default Index