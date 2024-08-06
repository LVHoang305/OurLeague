import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import bg from '../../assets/bg.png'

const Home = () => {

    return (
        <div className='w-full flex flex-col items-center h-full'
        style ={{ backgroundImage: `url(${bg})`, 
        width:'100%',
        minHeight:'100vh', 
        backgroundSize:'cover',
        backgroundAttachment:'fixed',
        backgroundRepeat:'space'}}
        >
            <Header />
            <Navigation/>
            <div className='w-1100 flex flex-col items-center justify-start'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Home
