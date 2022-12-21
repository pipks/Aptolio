import { AiOutlineHome } from 'react-icons/ai'
import { BiWallet } from 'react-icons/bi'

export const menuItem = [
  {
    type: 'noncollapsible',
    path: '/',
    key: 'home',
    name: 'Home',
    icon: <AiOutlineHome />
  },
  {
    type: 'noncollapsible',
    path: '/wallet',
    key: 'wallet',
    name: 'Wallet',
    icon: <BiWallet />
  },
  /* {
    type: 'collapsible',
    path: '/res',
    key: 'res',
    name: 'Resolver',
    icon: <AiOutlineSearch />,
    collapse: [
      {
        name: 'ENS Name',
        key: 'ens-name',
        path: '/res/ens-name'
      },
      {
        name: 'Unstoppable Domain',
        key: 'ud-name',
        path: '/res/ud-name'
      },
    ]
  }, */
]