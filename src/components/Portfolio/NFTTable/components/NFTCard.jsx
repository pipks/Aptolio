import Card from 'components/Cards/Card'
import NFTImage from './NFTImage'
import SendButton from './SendButton'

const NFTCard = ({ data, isChecking }) => {
  return (
    <div>
      <div className='flex'>
        <Card>
          <div className='p-2 duration-200 hover:bg-darkBorder rounded-lg'>
            <div className='w-full'>
              <NFTImage nftData={data} type='card' />
            </div>
            <div className='mt-2'>
              <p className='text-gray-400 text-sm'>{data.current_token_data.collection_name}</p>
              <p className='text-gray-100 text-md'>{data.current_token_data.name}</p>
            </div>
            {isChecking === undefined && <SendButton data={data} />}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default NFTCard
