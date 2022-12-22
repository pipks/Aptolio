import React from 'react'

const index = ({ src, alt, className = '', ...rest }) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = ''
  }

  return (
    <img onError={addDefaultSrc} src={src} alt={alt} {...rest} className={`${className}`} />
  )
}

export default index