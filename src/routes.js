import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineGeneratingTokens } from 'react-icons/md'
import { BiWallet } from 'react-icons/bi'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { TbAddressBook } from 'react-icons/tb'

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
    path: '/portfolio',
    key: 'portfolio',
    name: 'Portfolio',
    icon: <HiOutlineViewGrid />
  },
  {
    type: 'noncollapsible',
    path: '/address',
    key: 'address',
    name: 'Check Wallet',
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
  {
    type: 'noncollapsible',
    path: '/token-search',
    key: 'token-search',
    name: 'Token Search',
    icon: <MdOutlineGeneratingTokens />
  },
  {
    type: 'noncollapsible',
    path: '/addressbook',
    key: 'addressbook',
    name: 'Address Book',
    icon: <TbAddressBook />
  },
]