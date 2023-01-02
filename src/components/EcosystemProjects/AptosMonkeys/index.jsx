import Alert from 'components/Alerts'
import Card from 'components/Cards/Card'
import LoadingPulse from 'components/LoadingPulse'
import Typography from 'components/Typography'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { checkJungle } from 'utils/Ecosystem/AptosMonkeys'
import WithdrawButton from './WithdrawButton'

const Index = ({ walletAddress }) => {
  const [data, setData] = useState([])
  console.log(data)

  const calculateStakedTime = (timestamp) => {
    const currentDate = moment()
    const stakedTime = moment(timestamp / 1000)
    var a = moment(String(currentDate.toString()))
    var b = moment(String(stakedTime.toString()))
    return a.diff(b, 'hours')
  }

  const getJungleData = async () => {
    const getData = await checkJungle(walletAddress)
    setData(getData)
  }

  useEffect(() => {
    getJungleData()
    // eslint-disable-next-line
  }, [walletAddress])

  return (
    <div className=''>
      <Card title='Aptos Monkeys - Jungle' variant='collapsible'>
        <div className='p-2'>
          {Object.keys(data).length > 0 ? (
            <div>
              {data.status === 200 ? (
                <div>
                  {data.staked ? (
                    <div className='max-h-[400px] overflow-y-auto rounded-lg'>
                      <Typography>Total Staked: {data.data.length}</Typography>
                      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
                        {data.data.map((x, index) => (
                          <Card key={index}>
                            <div className='p-2'>
                              <img
                                src={`https://ipfs.io/ipfs/bafybeig6bepf5ci5fyysxlfefpjzwkfp7sarj6ed2f5a34kowgc6qenjfa/${String(x.token_id.token_data_id.name).split('#')[1]}.png`}
                                alt={x.token_id.token_data_id.name}
                                className='w-full rounded-lg'
                              />
                              <Typography className='text-sm py-1' color='text-gray-400'>
                                {x.token_id.token_data_id.name}
                              </Typography>
                              <div>
                                <div className='flex items-center justify-between'>
                                  <Typography className='text-sm'>SEEDZ EARNED:</Typography>
                                  <Typography className='text-sm'>{Number(calculateStakedTime(x.start_time) * 0.04).toFixed(2)}</Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                  <Typography className='text-sm'>TIME STAKED:</Typography>
                                  <Typography className='text-sm'>{calculateStakedTime(x.start_time)}h</Typography>
                                </div>
                                <Typography className='text-xs mt-1' color='text-gray-400'>
                                  STAKED AT {moment(x.start_time / 1000).format('DD/MM/YYYY HH:mm')}
                                </Typography>
                              </div>
                              <WithdrawButton data={x} />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Alert variant={data.statusCode} text={data.statusText} />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Alert variant={data.statusCode} text={data.statusText} />
                </div>
              )}
            </div>
          ) : (
            <LoadingPulse />
          )}
        </div>
      </Card>
    </div>
  )
}

export default Index
