import React from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import LoadingPulse from 'components/LoadingPulse'

const Index = ({ data }) => {

  return (
    <div>
      <Card title='User NFTs'>
        {Object.keys(data).length > 0 ? (
          <div className='p-3'>
            {data.status === 200 ? (
              <div className='flex flex-row items-center gap-1'>
                <Typography className='text-2xl font-light'>
                  {Object.keys(data.data.data).length}
                </Typography>
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