import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
import bg from '../../assets/bg.png'
import Header from '../Public/Header'
import Navigation from '../Public/Navigation'
import Sidebar from '../../components/Sidebar'

const System = () => {
    const {isLoggedin} = useSelector(state => state.auth)
    if (!isLoggedin) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='w-full h-full flex flex-col items-center'
        style ={{ backgroundImage: `url(${bg})`, 
        width:'100%',
        minHeight:'100vh', 
        backgroundSize:'cover',
        backgroundAttachment:'fixed',
        backgroundRepeat:'space'}}
        >
            <Header />
            <Navigation/>
            <div className='w-full flex flex-auto'>
                <Sidebar/>
                <div className='flex-auto h-full p-4'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default System