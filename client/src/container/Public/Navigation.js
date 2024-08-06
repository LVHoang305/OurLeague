import React from 'react'
import { NavLink } from 'react-router-dom'
import { path } from '../../ultils/constant'

const nav = [
  {name:'TRANG CHỦ', path:'/'}, 
  {name:'GIẢI ĐANG DIỄN RA', path: '/' + path.GIAI_DANG_DIEN_RA}, 
  {name:'GIẢI SẮP KHỞI TRANH',path: '/' +path.GIAI_SAP_KHOI_TRANH}, 
  {name:'GIẢI ĐÃ KẾT THÚC',path: '/' +path.GIAI_DA_KET_THUC}, 
  {name:'GIỚI THIỆU',path: '/' +path.GIOI_THIEU},
  {name: 'TÌM ĐỐI THỦ',path: '/he-thong/' +path.HUONG_DAN},
  {name: 'TIN TỨC',path: '/' +path.TIN_TUC}, 
  {name:'LIÊN HỆ',path: '/' +path.LIEN_HE}]

const notactive = 'hover:bg-third h-full flex items-center px-4'
const active = 'hover:bg-third bg-third h-full flex items-center px-4'

const Navigation = () => {
  return (
    <div className='w-full flex justify-center items-center h-[40px] bg-second text-white'>
        <div className='w-1100 flex h-[40px] items-center text-16'>
            {nav?.length > 0 && nav.map((item, index) =>{
              return (
                <div key={index} className='h-full flex justify-center items-center'>
                  <NavLink 
                  to={item.path}
                  className={({isActive})=> isActive ? active : notactive}
                  >
                    {item.name}
                  </NavLink>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default Navigation