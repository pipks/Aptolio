import React from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import SidenavItemCollapse from './SidenavItemCollapse';

const SidenavItem = ({ menuItem }) => {
	const location = useLocation();
	const { pathname } = location;
	const pathId = pathname.split('/')[1]
	const renderRoutes = menuItem.map(({ type, path, name, icon, key, collapse }) => {
		let returnValue;
		const active = path === `/${pathId}`
		if (type === 'noncollapsible') {
			returnValue = (
				<div key={key} className='mt-1'>
					<NavLink exact='true' to={path}>
						<div className={`${active ? 'bg-primary shadow-md' : 'hover:bg-primary'} group flex items-center space-x-2 cursor-pointer duration-150 hover:bg-darkCard w-full h-[50px] px-2 rounded-md`}>
							<div className='text-darkText duration-150 group-hover:text-white text-xl'>
								{icon}
							</div>
							<h1 className='text-darkText group-hover:text-white duration-150 text-sm'>{name}</h1>
						</div>
					</NavLink>
				</div>
			);
		} else if (type === 'title') {
			returnValue = (
				<p key={Math.random(0, 99)} className='text-zinc-700 text-sm mt-3'>{name}</p>
			);
		} else if (type === 'collapsible') {
			returnValue = (
				<SidenavItemCollapse name={name} icon={icon} key={key} path={path} pathname={pathname} collapse={collapse} />
			)
		}
		return returnValue;
	});

	return renderRoutes
}

export default SidenavItem