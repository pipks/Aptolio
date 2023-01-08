import React from 'react'
import Typography from 'components/Typography'
import SendButton from './components/SendButton'
import NFTImage from './components/NFTImage'
import AddressComponent from 'components/AddressComponent'

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
              <th scope='col' className='border-b border-darkBorder px-6 py-3 whitespace-nowrap'>
                CREATOR ADDRESS
              </th>
              <th scope='col' className='border-b border-darkBorder px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {data.data.data.current_token_ownerships.map((x, Index) => (
              <tr key={Index} className='w-full cursor-pointer hover:bg-darkBorder'>
                <th className='border-b border-darkBorder px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <div className='flex-shrink-0'>
                      <NFTImage nftData={x} type='table' />
                    </div>
                    <div className='flex flex-col'>
                      <Typography className='font-light whitespace-nowrap'>{x.current_token_data.name}</Typography>
                      <Typography className='font-light text-sm' color='text-gray-500'>
                        {x.current_token_data.collection_name}
                      </Typography>
                    </div>
                  </div>
                </th>
                <th className='border-b border-darkBorder px-6 py-4'>
                  <AddressComponent address={x.current_token_data.creator_address} type='account' short={true} showOpen={true} showCopy={true} />
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
