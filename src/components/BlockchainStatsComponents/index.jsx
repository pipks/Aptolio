import Alert from 'components/Alerts'
import Card from 'components/Cards/Card'
import LoadingPulse from 'components/LoadingPulse'
import Typography from 'components/Typography'

export const index = ({ title, data, type }) => {
  return (
    <div>
      <Card title={title}>
        <div className='p-3'>
          {Object.keys(data).length > 0 ? (
            <div>
              {data.status === 200 ? (
                <div>
                  {type === 'supply' && <Typography className='text-xl'>{Number(Number(data.data[0].total_supply) / 10 ** 8).toLocaleString('en-US')} APT</Typography>}
                  {type === 'staked' && <Typography className='text-xl'>{Number(Number(data.data[0].actively_staked) / 10 ** 8).toLocaleString('en-US')} APT</Typography>}
                  {type === 'tps' && <Typography className='text-xl'>{data.data[0].tps}</Typography>}
                  {type === 'validators' && <Typography className='text-xl'>{data.data[0].active_validators_count}</Typography>}
                </div>
              ) : (
                <Alert variant='error' text='API connection failed! try again!' />
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
