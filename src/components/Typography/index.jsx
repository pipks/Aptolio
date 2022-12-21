import React from 'react'

const index = ({ children, color, className = '', ...rest }) => {
  return (
    <p {...rest} className={`duration-150 ${color ? color : 'text-darkText'} ${className}`}>
      {children}
    </p>
  )
}

export default index