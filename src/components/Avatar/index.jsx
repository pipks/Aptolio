import React from 'react'
import QuestionMark from 'assets/images/questionMark.svg'

const index = ({ src, alt, className = '', ...rest }) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = QuestionMark
  }
  return (
    <img onError={addDefaultSrc} src={src} alt={alt} {...rest} className={`${className}`} />
  )
}

export default index