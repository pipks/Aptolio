import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
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
  {
    type: 'title',
    name: 'Tools'
  },
  {
    type: 'noncollapsible',
    path: '/ans',
    key: 'ans',
    name: 'Aptos Names',
    icon: <AiOutlineSearch />
  },
]