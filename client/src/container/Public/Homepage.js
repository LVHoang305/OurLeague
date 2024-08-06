import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import * as homeapi from '../../services/homepage'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// const sogiaidau = numberWithCommas(35970)
// const sodoibong = numberWithCommas(183233)
// const socauthu = numberWithCommas(847224)
// const sotrandau = numberWithCommas(1229018)

const Homepage = () => {
    const [sogiaidau, setsogiaidau] = useState(0)
    const [sodoibong, setsodoibong] = useState(0)
    const [socauthu, setsocauthu] = useState(0)
    const [sotrandau, setsotrandau] = useState(0)

    useEffect(() => {
        const fetchtour = async () => {
            const response1 = await homeapi.apicounttour()
            if (response1?.data.err === 0){
                setsogiaidau(response1.data.response)
            }}
        
        const fetchteam = async () => {
            const response2 = await homeapi.apicountteam()
            if (response2?.data.err === 0){
                setsodoibong(response2.data.response)
            }}

        const fetchplayer = async () => {
            const response3 = await homeapi.apicountplayer()
            if (response3?.data.err === 0){
                setsocauthu(response3.data.response)
            }}

        const fetchmatch = async () => {
            const response4 = await homeapi.apicountmatch()
            if (response4?.data.err === 0){
                setsotrandau(response4.data.response)
            }}
        fetchtour()
        fetchteam()
        fetchplayer()
        fetchmatch()
      }, [])

    return (
        <div className='w-1100 flex flex-col items-center justify-start'>
                <div className="flex relative gap-5 justify-between mt-[40px] text-3xl font-bold text-white leading-[50px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full max-md:text-4xl max-md:leading-[49px]">
                    <span className='text-5xl text-white font-bold tracking-tight p-7'>OurLeague</span>
                            <span className="my-auto h-0.5 bg-white w-[55px]" />
                            <div className="flex-auto max-md:max-w-full max-md:text-4xl max-md:leading-[49px]">
                            Tổ chức giải đấu dễ dàng
                            <br />
                            Quản lý đội thể thao đơn giản!
                            </div>
                        </div>
                    <div className="flex overflow-hidden relative flex-col flex-1 items-start py-12 pr-20 pl-4 max-md:pr-5 max-md:max-w-full">
                        <div className="flex relative gap-5 justify-between ml-[450px] text-base font-bold leading-6 text-center text-white whitespace-nowrap max-md:ml-2.5">
                            <Link to='he-thong/tao-giai' className="grow justify-center px-8 py-3 bg-red-700 rounded-3xl max-md:px-5">
                            Tạo giải đấu
                            </Link>
                            <Link to= 'tim-kiem' className="grow justify-center px-8 py-3 bg-black rounded-3xl max-md:px-5">
                            Tìm giải đấu
                            </Link>
                        </div>
                        <div className="flex relative gap-5 justify-between mt-10 ml-[450px] text-base font-bold leading-6 text-center text-white whitespace-nowrap max-md:mt-10 max-md:ml-2.5">
                            <Link to='he-thong/tao-doi' className="grow justify-center px-8 py-3 bg-black rounded-3xl max-md:px-5">
                            Tạo đội hình
                            </Link>
                            <Link to='he-thong/quan-ly-doi' className="grow justify-center px-8 py-3 bg-blue-800 rounded-3xl max-md:px-5">
                            Quản lý đội
                            </Link>
                        </div>
                        <div className="flex relative gap-5 justify-between mt-24 ml-24 max-w-full text-center w-[934px] max-md:flex-wrap max-md:mt-10">
                            <div className="flex flex-col flex-1 whitespace-nowrap">
                            <div className="justify-center items-center px-16 py-1.5 text-base font-medium leading-6 text-black bg-white rounded max-md:px-5">
                                Giải đấu
                            </div>
                            <div className="self-center mt-4 text-4xl font-bold leading-10 text-white">
                                {numberWithCommas(sogiaidau)}
                            </div>
                            </div>
                            <div className="flex flex-col flex-1 whitespace-nowrap">
                            <div className="justify-center px-16 py-1.5 text-base font-medium leading-6 text-black bg-white rounded max-md:px-5">
                                Đội thi đấu
                            </div>
                            <div className="self-center mt-4 text-4xl font-bold leading-10 text-white">
                                {numberWithCommas(sodoibong)}
                            </div>
                            </div>
                            <div className="flex flex-col flex-1">
                            <div className="justify-center items-center py-1.5 pr-14 pl-16 -mr-px text-base font-medium leading-6 text-black bg-white rounded max-md:px-5">
                                Cầu thủ
                            </div>
                            <div className="self-center mt-4 text-4xl font-bold leading-10 text-white">
                                {numberWithCommas(socauthu)}
                            </div>
                            </div>
                            <div className="flex flex-col flex-1 whitespace-nowrap">
                            <div className="justify-center items-center px-16 py-1.5 text-base font-medium leading-6 text-black bg-white rounded max-md:px-5">
                                Trận đấu
                            </div>
                            <div className="self-center mt-4 text-4xl font-bold leading-10 text-white">
                                {numberWithCommas(sotrandau)}
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default Homepage
