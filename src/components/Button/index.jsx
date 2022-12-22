import React from 'react'
import PropTypes from 'prop-types';

const Index = ({ color, textColor, contained, children, className = '', ...rest }) => {
	return (
		<div>
			{contained ?
				(
					<button
						{...rest}
						className={`border-[1px] border-darkButton px-4 py-2 text-darkButton hover:text-black rounded-lg duration-150 w-full hover:bg-darkButton disabled:bg-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed disabled:border-0 ${className}`}>
						{children}
					</button>
				)
				:
				(
					<button
						{...rest}
						className={`bg-darkButton px-4 py-2 w-full rounded-lg duration-200 hover:bg-darkButton/70 disabled:bg-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed ${className}`}>
						{children}
					</button>
				)}
		</div>
	)
}

Index.defaultProps = {
	color: 'darkButton',
	textColor: 'white',
};

Index.propTypes = {
	title: PropTypes.string,
	textColor: PropTypes.string,
};

export default Index