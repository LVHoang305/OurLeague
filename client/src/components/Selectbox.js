import React, {memo} from 'react'

const Selectbox = ({text}) => {
  return (
    <div className='bg-white py-2 px-4 w-[300px] rounded-md text-gray-400 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>
      {text}
    </div>
  )
}

export default memo(Selectbox)