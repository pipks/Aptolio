import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const Index = ({ title, variant, children, ...rest }) => {
  const [cardOpen, setCardOpen] = useState(true)

  return (
    <div className='duration-150 bg-darkCard rounded-lg shadow-[#101011] border border-darkBorder'>
      <div {...rest}>
        <div>
          {title && (
            <div className='duration-150 bg-lightHover bg-darkBorder w-full rounded-t-lg flex items-center justify-between'>
              <div>
                <p className={`duration-150 text-lightText text-darkText font-bold ${title === undefined ? '' : 'px-3 py-2'}`}>{title}</p>
              </div>
              <div className={`${variant === undefined ? '' : 'px-3 py-2'}`}>
                {variant === 'collapsible' ? (
                  <div>
                    {cardOpen ? <IoIosArrowUp onClick={() => setCardOpen(!cardOpen)} className='cursor-pointer text-darkText' /> : <IoIosArrowDown onClick={() => setCardOpen(!cardOpen)} className='cursor-pointer text-darkText' />}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
        {variant === 'collapsible' ? (
          <div>
            {cardOpen ? (
              <div className='border duration-150 border-darkText opacity-10 mb-1'></div>
            ) : null}
          </div>
        ) : null}
        {variant === 'collapsible' ? (
          <div>
            {cardOpen ? (
              <div>
                {children}
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default Index