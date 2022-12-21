import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'

//ჩამოსაშლელი მენიუს კომპონენტი
const SidenavItemCollapse = ({ icon, name, path, pathname, collapse }) => {
  const [collapsed, setIsCollapsed] = useState(false)
  const collapseName = pathname.split('/').slice(1)[0];
  const active = path === `/${collapseName}`

  const renderCollapse = collapse.map(({ name, key, path }) => {
    let returnValue;
    returnValue = (
      <NavLink key={key} exact='true' to={path}>
        <div className='duration-150 hover:bg-darkCard rounded-lg p-2 cursor-pointer'>
          <p className={`text-darkText duration-150 text-sm ${path === pathname ? 'bg-darkCard p-2 rounded-lg' : ''}`}>{name}</p>
        </div>
      </NavLink>

    )
    return returnValue
  })

  return (
    <div className='py-1'>
      <div className={`${active ? 'bg-primary shadow-lg' : ''} group flex items-center justify-between space-x-2 cursor-pointer duration-150 hover:bg-darkCard w-full h-[50px] px-2 rounded-md`} onClick={() => collapsed === name ? setIsCollapsed(!collapsed) : setIsCollapsed(!collapsed)} >
        <div className='flex items-center space-x-2'>
          <div className={`${active ? 'text-white' : 'text-darkText'} duration-150 group-hover:text-white text-xl`}>
            {icon}
          </div>
          <h1 className={`${active ? 'text-white' : 'text-darkText'} group-hover:text-white duration-150 text-sm`}>{name}</h1>
        </div>
        {collapsed ? (<IoIosArrowUp className={`duration-150 text-white group-hover:text-white ${active ? 'text-white' : 'text-primary'}`} />) : (<IoIosArrowDown className={`duration-150 text-white group-hover:text-white ${active ? 'text-white' : ''}`} />)}
      </div>
      <Transition show={collapsed}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 -translate-y-1'>
        <div>
          <div className='mt-2'>{renderCollapse}</div>
        </div>
      </Transition>
    </div>
  )
}

export default SidenavItemCollapse