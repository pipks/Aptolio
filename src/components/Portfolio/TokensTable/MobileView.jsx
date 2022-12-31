import Alert from 'components/Alerts'
import LoadingPulse from 'components/LoadingPulse'
import Typography from 'components/Typography'
import ReceiveButton from './components/ReceiveButton'
import SendButton from './components/SendButton'
import { getTokenLogo } from './Helper'

const Index = ({ data, isChecking }) => {

  return (
    <div className='w-full'>
      {Object.keys(data).length > 0 ? (
        <div>
          {data.status === 200 ? (
            <div>
              {data.data.data.current_coin_balances.length > 0 ? (
                <div className='overflow-y-auto'>
                  <table className='border-collapse table-auto w-full text-sm text-left bg-darkCard'>
                    <thead className='text-gray-500 text-xs uppercase'>
                      <tr>
                        <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                          Name
                        </th>
                        <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.data.current_coin_balances.map((x, Index) => (
                        <tr key={Index} className='w-full cursor-pointer hover:bg-darkBorder'>
                          <th className='border-b border-darkBorder px-6 py-4'>
                            <div className='flex items-center gap-2'>
                              <img
                                src={getTokenLogo(x.coin_info !== null ? x.coin_info.coin_type : '')}
                                alt='Logo'
                                className='rounded-full w-[36px] h-[36px] ' />
                              <div className='flex flex-col'>
                                <Typography className='uppercase'>{x.coin_info !== null ? x.coin_info.symbol : '-'}</Typography> </div>
                            </div>
                          </th>
                          <th className='border-b border-darkBorder px-6 py-4'>
                            {x.coin_info !== null ? (
                              <Typography className='font-light'>
                                {Number(Number(x.amount) / 10 ** x.coin_info.decimals).toFixed(8)}
                              </Typography>
                            ) : (
                              <Typography className='font-light'>
                                -
                              </Typography>
                            )}
                            {!isChecking && (
                              <div className='flex flex-row gap-2'>
                                <SendButton data={x} disabled={x.amount === 0 ? true : false} />
                                <ReceiveButton data={x} />
                              </div>
                            )}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='p-3'>
                  <Alert variant='warning' text='You have no tokens' />
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
  )
}

export default Index