import React from 'react'
import { text } from '../../ultils/contactText'

export const Contact = () => {
  return (
    <div className='flex rounded-md shadow-md p-4 w-1100 flex-col justify-center items-center gap-6'>
      <img src={text.image} alt='Hỗ trợ' className='w-full h-48 object-contain'/>
      <p className='text-white'>{text.content}</p>
      <div className='flex items-center justify-center w-full'>
        {text.contacts.map((item,index) => { 
          return (
            <div key={index} className='flex flex-col items-center justify-center px-3'>
              <span className='text-red-600 font-semibold'>{item.text}</span>
              <span className='text-blue-700 text-[24px] font-semibold'>{item.phone}</span>
              <span className='text-blue-700 text-[24px] font-semibold'>{item.zalo}</span>
            </div>
          )})}
      </div>
    </div>

  )
}

export default Contact