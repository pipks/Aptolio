import APTLogo from 'assets/images/aptlogo.svg'
import Alert from 'components/Alerts'
import Card from 'components/Cards/Card'
import LoadingPulse from 'components/LoadingPulse'
import Typography from 'components/Typography'
import { BsImages, BsReceiptCutoff } from 'react-icons/bs'
import { RxTokens } from 'react-icons/rx'

const index = ({ title, data, isLoading }) => {
  return (
    <div>
      <Card>
        <div className='p-2'>
          <div className='flex justify-between items-center'>
            <div>
              <Typography color='text-gray-600 text-sm'>{title}</Typography>
              {title === 'APT Balance' && (
                <div>
                  {isLoading === false ? (
                    <div>
                      {Object.keys(data).length > 0 && (
                        <div>
                          {data.status === 200 ? (
                            <div>
                              {data.data.data.current_coin_balances.length > 0 ? (
                                <Typography className='text-2xl'>{Number(data.data.data.current_coin_balances[0].amount / 10 ** 8).toLocaleString('en-US')}</Typography>
                              ) : (
                                <Typography className='text-2xl'>0</Typography>
                              )}
                            </div>
                          ) : (
                            <Alert variant='error' text='API connection failed! try again!' />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex w-[150px]'>
                      <LoadingPulse />
                    </div>
                  )}
                </div>
              )}
              {title === 'Tokens' && (
                <div>
                  {isLoading === false ? (
                    <div>
                      {Object.keys(data).length > 0 && (
                        <div>
                          {data.status === 200 ? (
                            <div>
                              <Typography className='text-2xl'>{Object.keys(data.data.data.current_coin_balances).length}</Typography>
                            </div>
                          ) : (
                            <Alert variant='error' text='API connection failed! try again!' />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex w-[150px]'>
                      <LoadingPulse />
                    </div>
                  )}
                </div>
              )}
              {title === 'NFTs' && (
                <div>
                  {isLoading === false ? (
                    <div>
                      {Object.keys(data).length > 0 && (
                        <div>
                          {data.status === 200 ? (
                            <div>
                              <Typography className='text-2xl'>{data?.data?.data?.current_token_ownerships_aggregate?.aggregate?.count}</Typography>
                            </div>
                          ) : (
                            <Alert variant='error' text='API connection failed! try again!' />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex w-[150px]'>
                      <LoadingPulse />
                    </div>
                  )}
                </div>
              )}
              {title === 'Transactions' && (
                <div>
                  {isLoading === false ? (
                    <div>
                      {Object.keys(data).length > 0 && (
                        <div>
                          {data.status === 200 ? (
                            <div>
                              <Typography className='text-2xl'>{data.data.data.move_resources_aggregate.aggregate.count}</Typography>
                            </div>
                          ) : (
                            <Alert variant='error' text='API connection failed! try again!' />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex w-[150px]'>
                      <LoadingPulse />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='w-12 h-12 bg-darkBackground rounded-lg border-[1px] border-primary/20 flex items-center justify-center'>
              {title === 'APT Balance' && <img src={APTLogo} alt='aptlogo' className='w-8' />}
              {title === 'Tokens' && <RxTokens className='text-white text-3xl' />}
              {title === 'NFTs' && <BsImages className='text-white text-2xl' />}
              {title === 'Transactions' && <BsReceiptCutoff className='text-white text-2xl' />}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default index
