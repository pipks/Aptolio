import React from 'react'
import PropTypes from 'prop-types';

const Index = ({ color, textColor, contained, children, className = '', ...rest }) => {
	return (
		<div>
			{contained ?
				(
					<button
						{...rest}
						className={`border-[1px] border-${color} px-4 py-2 text-primary hover:text-white rounded-lg duration-150 hover:scale-[0.99] w-full hover:bg-${color} shadow-lg hover:shadow-${color}/40 disabled:bg-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed disabled:scale-100 disabled:border-0 ${className}`}>
						{children}
					</button>
				)
				:
				(
					<button
						{...rest}
						className={`bg-${color} px-4 py-2 text-${textColor} rounded-lg duration-150 hover:scale-[0.99] hover:bg-primaryDark shadow-lg w-full hover:shadow-${color}/40 disabled:bg-gray-500 disabled:text-gray-700 disabled:cursor-not-allowed disabled:scale-100 ${className}`}>
						{children}
					</button>
				)}
		</div>
	)
}

Index.defaultProps = {
	color: 'primary',
	textColor: 'white',
};

Index.propTypes = {
	title: PropTypes.string,
	textColor: PropTypes.string,
};

export default Index