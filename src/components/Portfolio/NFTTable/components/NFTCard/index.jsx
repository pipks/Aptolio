import Card from './Card'

const index = ({ data, isChecking }) => {
  return (
    <div className={`${isChecking ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'}`}>
      {data.map((x, index) => (
        <div key={index}>
          <Card data={x} isChecking={isChecking} />
        </div>
      ))}
    </div>
  )
}

export default index
