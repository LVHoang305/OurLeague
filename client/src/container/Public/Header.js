import React, {useEffect, useCallback, useState } from 'react'
import { Button } from '../../components'
import { useNavigate, Link } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import {usermenu} from '../../ultils/usermenu'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showmenu, setshowmenu] = useState(false)
    const {isLoggedin} = useSelector(state => state.auth)
    const {userData} = useSelector(state => state.user)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, {state: {flag}})
    },[])
    useEffect (() => {
        setTimeout(() => {
            isLoggedin && dispatch(actions.getUser())
        }, 1000)       
    }, [isLoggedin])
    
    return (
        <div className='w-full h-[60px] flex items-center justify-between bg-third'>
            <Link to={'/'} className='text-3xl text-white font-bold tracking-tight p-3'>OurLeague</Link>
            <div className='flex items-center gap-1'>
                {!isLoggedin &&
                <div className='flex items-center gap-1'>
                    <Button text = "Đăng ký" textColor="text-white" bgColor="transparent" onClick={() => {goLogin(true)}}/>
                    <Button text = "Đăng nhập" textColor="text-white" bgColor="transparent" onClick={() => {goLogin(false)}}/>
                </div>}
                {isLoggedin &&
                <div className='flex items-center gap-1 relative'>
                    <small className='text-white'>Xin chào {userData.lastName} </small>
                    <Button text = "Quản lý" textColor="text-red-500" bgColor="transparent" onClick={() => setshowmenu(prev => !prev)}/>
                    {showmenu && <div className='absolute flex flex-col gap-2 border w-[200px] top-full bg-white shadow-md rounded-md p-4 right-0'>
                        {usermenu.map(item => {
                            return (
                                <Link className='hover:bg-second rounded-md border-b border-gray-300' key={item.id} to={item?.path}>{item.text}</Link>
                            )
                        })}
                        <span onClick={() => {dispatch(actions.logout())}} className='cursor-pointer hover:bg-second rounded-md border-b border-gray-300'>Đăng xuất</span>
                    </div>}
                </div>}
            </div>
        </div>
    )
}

export default Header
