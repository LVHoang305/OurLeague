import React from 'react'
import {sidebarmenu} from '../ultils/sidebarmenu'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    let text= '> Thông tin tài khoản chung'
    const {userData} = useSelector(state => state.user)
    return (
    <div className='w-[230px] flex bg-[#333333] flex-col'>
        {sidebarmenu.map(item => {
            return (
                <Link className={item.color} key={item.id} to={item?.path}>{item.text}</Link>)
            })}
        {(userData.role===1) && <Link className='hover:bg-white font-Oswald w-full border-b border-white p-2 bg-second' key={13} to={'quan-ly-tai-khoan'}>{text}</Link>}

    </div>
  )
}

export default Sidebar