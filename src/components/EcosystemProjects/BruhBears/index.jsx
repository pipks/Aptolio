import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import LoadingPulse from 'components/LoadingPulse'
import WithdrawButton from './WithdrawButton'
import { checkTavern } from 'utils/Ecosystem/BruhTavern'


const Index = ({ walletAddress }) => {
  const [data, setData] = useState([])

  const getTavernData = async () => {
    const getData = await checkTavern(walletAddress)
    console.log(getData)
    setData(getData)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getTavernData()
    }, 5000)

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [walletAddress])

  return (
    <div>
      <Card title='Bruh Bears - Taverns' variant='collapsible'>
        <div className='p-2'>
          {Object.keys(data).length > 0 ? (
            <div>
              {data.status === 200 ? (
                <div>
                  {data.staked ? (
                    <div>
                      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2'>
                        {data.data.map((x, index) => (
                          <Card key={index}>
                            <div className='p-2'>
                              <img src={`https://bafybeih6hezn7yyabgunclxhi5xa2sbfd6gnnc6un3lilcufq5yyywlpqm.ipfs.nftstorage.link/${String(x.tokens.name).split('#')[1]}.png`} alt={x.tokens.name} className='w-full rounded-lg' />
                              <Typography className='text-sm py-1' color='text-gray-400'>{x.tokens.name}</Typography>
                              <div>
                                <div className='flex items-center justify-between'>
                                  <Typography className='text-sm'>PROGRESS:</Typography>
                                  <Typography className='text-sm'>{x.progress}%</Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                  <Typography className='text-sm'>LEVEL:</Typography>
                                  <Typography className='text-sm'>{x.level}</Typography>
                                </div>
                                <Typography className='text-xs mt-1' color='text-gray-400'>STAKED AT {x.tokens.stakedAt}</Typography>
                              </div>
                              <WithdrawButton data={x.tokens} />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Alert variant='info' text='User has no staked Bruh Bears' />
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