import React, {useState} from 'react'

export const Modal = ({setisShowModal, content, name, handlesubmit}) => {

  
  
  return (
    <div 
      onClick={() =>{setisShowModal(false)}} 
      className='fixed top-0 left-0 right-0 bottom-0 z-20 bg-overlay-70 flex justify-center items-center'>
        <div 
          onClick={(e) =>{
            e.stopPropagation()
            setisShowModal(true)
          }} 
          className='w-2/3 bg-white rounded-md'>
            <div className='p-4 flex flex-wrap gap-1'>
              {content?.map(item =>{
                return (
                  <span key={item.id} onClick={(e) => handlesubmit(e, item.id, item.name)} className='py-2 border-b border-gray-200 flex-2 px-2'>
                    <input type='radio' name={name} id={item.id} value={item.id} />
                    <label htmlFor={item.id}>{item.name}</label>
                  </span>
                )})}
          </div>
        </div>
    </div>
  )
}

export default Modal
