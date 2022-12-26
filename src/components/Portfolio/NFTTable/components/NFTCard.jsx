import React from 'react'
import Card from 'components/Cards/Card'
import SendButton from './SendButton'
import { getNFTImage } from 'utils/Helpers/NFTHelpers'
import Avatar from 'components/Avatar'

const NFTCard = ({ data }) => {
  return (
    <div>
      <div className='flex'>
        <Card>
          <div className='p-2 duration-200 hover:bg-darkBorder rounded-lg'>
            <div className='w-full'>
              <Avatar src={getNFTImage(data.preview_uri)} alt="test" className='rounded-lg object-cover' />
            </div>
            <div className='mt-2'>
              <p className='text-gray-400 text-sm'>{data.collection_name}</p>
              <p className='text-gray-100 text-md'>{data.token_name}</p>
            </div>
            <p className='text-gray-400 text-sm'>{data.is_listed ? 'Listed' : 'Unlisted'}</p>
            <SendButton disabled={data.is_listed ? true : false} data={data} />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default NFTCard