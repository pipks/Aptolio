import React from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Alerts from 'components/Alerts'
import LoadingPulse from 'components/LoadingPulse'
import { getNFTImage } from 'utils/Helpers'

const index = ({ data }) => {
  return (
    <div className='mt-2'>
      <Card title='NFTs' variant='collapsible'>
        {Object.keys(data).length > 0 ? (
          <div>
            {data.status === 200 ? (
              <div className='max-h-[500px] overflow-y-auto rounded-lg'>
                {data.data.data.length > 0 ? (
                  <div className='overflow-y-auto'>
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
                            Collection Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.data.map((x, index) => (
                          <tr key={index} className='w-full cursor-pointer hover:bg-darkBorder'>
                            <th className='border-b border-darkBorder px-6 py-4'>
                              <Typography className='font-light text-gray-500'>{index + 1}</Typography>
                            </th>
                            <th className='border-b border-darkBorder px-6 py-4'>
                              <div className='flex items-center gap-1'>
                                <img src={getNFTImage(x.preview_uri)} alt={x.collection_name} className='w-12 rounded-lg' />
                                <Typography className='font-light'>{x.token_name}</Typography>
                              </div>
                            </th>
                            <th className='border-b border-darkBorder px-6 py-4'>
                              <Typography className='font-light'>{x.collection_name}</Typography>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className='p-3'>
                    <Alerts variant='warning' text='User has no NFTs' />
                  </div>
                )}
              </div>
            ) : (
              <div className='p-3'>
                <Alerts variant='error' text='API connection failed! try again!' />
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