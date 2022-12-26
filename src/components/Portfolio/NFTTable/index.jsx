import React from 'react'
import Card from 'components/Cards/Card'
import NFTCard from './components/NFTCard'
import LoadingPulse from 'components/LoadingPulse'
import Alert from 'components/Alerts'

const index = ({ data }) => {
  return (
    <div>
      <Card title='NFTs'>
        <div className='p-3'>
          {Object.keys(data).length > 0 ? (
            <div>
              {data.status === 200 ? (
                <div>
                  {data.data.data.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
                      {data.data.data.map((x, index) => (
                        <div key={index}>
                          <NFTCard data={x} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <Alert variant='warning' text='You have no NFTs' />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Alert variant='error' text='API connection failed! try again!' />
                </div>
              )}
            </div>
          ) : (
            <div>
              <LoadingPulse />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default index