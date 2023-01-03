import React from 'react'
import Typography from 'components/Typography'
import { getNFTImage } from 'utils/Helpers/NFTHelpers'
import SendButton from './components/SendButton'

const TableView = ({ data }) => {
  return (
    <div>
      <div className='overflow-y-auto'>
        <table className='border-collapse table-auto w-full text-sm text-left bg-darkCard'>
          <thead className='text-gray-500 text-xs uppercase'>
            <tr>
              <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                NAME
              </th>
              <th scope='col' className='border-b border-darkBorder px-6 py-3'>
                LISTED ON TOPAZ
              </th>
              <th scope='col' className='border-b border-darkBorder px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {data.data.data.map((x, Index) => (
              <tr key={Index} className='w-full cursor-pointer hover:bg-darkBorder'>
                <th className='border-b border-darkBorder px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <img src={getNFTImage(x.preview_uri)} alt='test' className='rounded-lg w-[46px] h-[46px] ' />
                    <div className='flex flex-col'>
                      <Typography className='font-light whitespace-nowrap'>{x.token_name}</Typography>
                      <Typography className='font-light text-sm' color='text-gray-500'>
                        {x.collection_name}
                      </Typography>
                    </div>
                  </div>
                </th>
                <th className='border-b border-darkBorder px-6 py-4'>
                  <Typography className='font-light'>{x.is_listed ? 'Listed' : 'Unlisted'}</Typography>
                </th>
                <th className='border-b border-darkBorder px-6 py-4'>
                  <SendButton data={x} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableView
