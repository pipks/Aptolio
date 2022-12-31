import Card from 'components/Cards/Card'
import Modal from 'components/Modal'
import Typography from 'components/Typography'
import { useEffect, useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import { TbAddressBook } from 'react-icons/tb'
import { shortAddress } from 'utils/Helpers'

const Index = ({ inputId }) => {
  const [open, setOpen] = useState(false)
  const [savedAddresses, setSavedAddresses] = useState([])

  const getSavedAddresses = () => {
    var addressesList = JSON.parse(localStorage.getItem('addressBook'))
    if (addressesList === null) {
      setSavedAddresses([])
    } else {
      setSavedAddresses(addressesList)
    }
  }

  const pasteAndClose = (walletAddress) => {
    var element = document.getElementById(inputId)
    element.value = walletAddress
    element.dispatchEvent(new Event('input', { bubbles: true }))
    setOpen(!open)
    element.dispatchEvent(new Event('input', { bubbles: true }))
  }

  useEffect(() => {
    getSavedAddresses()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className='flex'>
        <div onClick={() => setOpen(!open)} className='cursor-pointer duration-150 hover:scale-105'>
          <Card>
            <div className='flex items-center justify-center p-2'>
              <TbAddressBook className='text-2xl text-primary' />
            </div>
          </Card>
        </div>
      </div>
      <Modal title='Saved Addresses' open={open} close={() => setOpen(!open)}>
        <div className=''>
          {savedAddresses.length > 0 ? (
            <div>
              <div className='overflow-y-auto'>
                <table className='border-collapse table-auto w-full text-sm text-left '>
                  <thead className='text-gray-500 text-xs'>
                    <tr>
                      <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                        NAME
                      </th>
                      <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                        ADDRESS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedAddresses.map((x, index) => (
                      <tr onClick={() => pasteAndClose(x.walletAddress)} key={index} className='w-full cursor-pointer duration-150 hover:bg-darkBorder'>
                        <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                          <Typography>{x.walletName}</Typography>
                        </th>
                        <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                          <Typography>{shortAddress(x.walletAddress, 5)}</Typography>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className='p-3 py-6 flex items-center justify-center'>
              <a href='/addressbook' target='_blank' rel='noreferrer'>
                <Typography className='text-primary flex items-center gap-3'>
                  <HiUserAdd className='text-xl' />
                  ADD ADDRESS
                </Typography>
              </a>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Index
