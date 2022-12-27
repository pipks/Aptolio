import React from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import LoadingPulse from 'components/LoadingPulse'
import AddressComponent from 'components/AddressComponent'
import Alert from 'components/Alerts'
import Status from './components/Status'
import { getAddressFromPayload, getFunctionFromFunctionId, calculateFee, getAPTTransferAmount } from 'utils/Helpers/TransactionHelpers'
import { convertTimestampToDate, getExplorerURL } from 'utils/Helpers'

const Index = ({ walletAddress, data, isLoading }) => {
  return (
    <div>
      <Card title='Transactions'>
        <div>
          {!isLoading ? (
            <div>
              {!data.hasOwnProperty('status') ? (
                <div>
                  {Object.keys(data).length > 0 ? (
                    <div className='overflow-y-auto'>
                      <table className='border-collapse table-auto w-full text-sm text-left bg-darkCard'>
                        <thead className='text-gray-500 text-xs uppercase'>
                          <tr>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              VERSION
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              STATUS
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              TIMESTAMP
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              SENDER
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              SENT TO
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              FUNCTION
                            </th>
                            <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                              AMOUNT
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((x, index) => (
                            <tr key={index} className='w-full cursor-pointer hover:bg-darkBorder'>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <a href={getExplorerURL('txn', x.version)} target='_blank' rel='noreferrer'>
                                  <Typography className='font-light whitespace-nowrap hover:underline' color='text-primary'>{x.version}</Typography>
                                </a>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <Status status={x.success} />
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <Typography className='font-light whitespace-nowrap'>{convertTimestampToDate(x.timestamp)}</Typography>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <div className='flex'>
                                  <div className='bg-[#363A39] px-3 py-1 rounded-lg'>
                                    <AddressComponent address={x.sender} type='account' short={true} />
                                  </div>
                                </div>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <div className='flex'>
                                  <div className='bg-[#363A39] px-3 py-1 rounded-lg'>
                                    {/* <AddressComponent address={getAddressFromPayload(x)} type='account' /> */}
                                    {/* <Typography className='font-light whitespace-nowrap'>{getAddressFromPayload(x)}</Typography> */}
                                    <AddressComponent address={getAddressFromPayload(x)}
                                      type='account'
                                      short={String(getAddressFromPayload(x)).length > 20 ? true : false} />
                                  </div>
                                </div>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <div className='flex'>
                                  <div className='bg-[#192C32] px-3 py-1 rounded-lg'>
                                    <Typography className='font-light whitespace-nowrap'>
                                      {getFunctionFromFunctionId(x.payload.function)}
                                    </Typography>
                                  </div>
                                </div>
                              </th>
                              <th className='border-b border-darkBorder px-6 py-4'>
                                <div className='flex flex-col'>
                                  {getAPTTransferAmount(walletAddress, x)}
                                  <Typography className='font-light whitespace-nowrap text-sm' color='text-gray-600'>
                                    Gas {calculateFee(x)}
                                  </Typography>
                                </div>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className='p-3'>
                      <Alert variant='warning' text='You have no transactions!' />
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
        </div>
      </Card >
    </div >
  )
}

export default Index