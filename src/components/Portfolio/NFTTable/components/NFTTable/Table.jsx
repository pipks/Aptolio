import AddressComponent from 'components/AddressComponent'
import Typography from 'components/Typography'
import { useState } from 'react'
import { getNftDetails } from 'utils/Helpers/NFTHelpers'
import NFTImage from '../NFTImage'
import NFTModal from '../NFTModal'

const TableView = ({ data, isChecking }) => {
  const [open, setOpen] = useState(false)
  const [nftAttributes, setNftAttributes] = useState([])
  const [selected, setSelected] = useState([])

  const openModal = async (selectedNft) => {
    setSelected([])
    setNftAttributes([])
    setOpen(!open)
    const getTest = await getNftDetails(selectedNft.current_token_data.metadata_uri)
    setSelected(selectedNft)
    setNftAttributes(getTest)
  }

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
            </tr>
          </thead>
          <tbody>
            {data.map((x) => (
              <tr onClick={() => openModal(x)} key={x.current_token_data.name} className='w-full cursor-pointer hover:bg-darkBorder'>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(nftAttributes).length === 0 && Object.keys(selected).length === 0 ? null : <NFTModal data={selected} nftAttributes={nftAttributes} isChecking={isChecking} modalOpen={open} modalClose={() => setOpen(!open)} />}
    </div>
  )
}

export default TableView
