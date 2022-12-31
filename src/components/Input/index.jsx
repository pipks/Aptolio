const index = ({ className = '', ...rest }) => {
  return (
    <input {...rest} className={`duration-normal rounded-lg w-full p-2 bg-darkBackground border-[1px] border-darkBorder text-primary focus:outline-none ${className}`} />
  )
}

export default index