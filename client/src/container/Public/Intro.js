import React from 'react'
import { text } from '../../ultils/introText'

export const Intro = () => {
  return (
    <div className='w-1100 mt-40 rounded-md shadow-md p-4 flex flex-col justify-center items-center'>
      <h3 className='font-bold text-lg text-red-600'>{text.title}</h3>
      <p className='text-white text-center my-4'>{text.description}</p>
      <div className='flex items-center justify-around w-full'>
        {text.statistic.map((item,index) =>{
          return (
            <div className='flex flex-col justify-center items-center' key={index}>
              <h4 className='font-bold text-red-600 text-lg'>{item.value}</h4>
              <p className='text-white'>{item.name}</p>
            </div>
          )})}
      </div>
    </div>
  )
}

export default Intro