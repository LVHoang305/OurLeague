import React, {useEffect, useState} from 'react'
import Modal from './Modal'
import { apiGetLocation } from '../services/location'
import { Selectbox } from './'
import { apiupdateTour } from '../services/tour'
import Swal from 'sweetalert2'

const UpdateTour = ({dataedit, setedittour, getyourtour}) => {
    //console.log(dataedit)

    const [locations, setlocations] = useState([])
    const [isShowModal, setisShowModal] = useState(false)
    const [content, setcontent] = useState([])
    const [locationname, setlocationname] = useState('')
    const [texts, settexts] = useState('')
    const [check, setcheck] = useState(false)

    const [queries, setqueries] = useState(() => {
        const initData = {
            id: dataedit?.id || 0,
            name: dataedit?.name || '',
            staff: dataedit?.staff || 0,
            substaff: dataedit?.substaff || 0,
            phone: dataedit?.phone || '',
            email: dataedit?.email || '',
            location: dataedit?.location || 0,
            begin: dataedit?.begin.slice(0, 10) || '',
            end: dataedit?.end.slice(0, 10) || '',
            maxteam: dataedit?.maxteam || 0,
            type: dataedit?.type || 0,
            turn: dataedit?.turn || 0,
            roundtime: dataedit?.roundtime || 0,
            round: dataedit?.round || 0,
            players: dataedit?.players || 0,
            tlocation: dataedit?.tlocation || {}
        }
        return initData
    })
    useEffect(() => {
        const fetchLocations = async () => {
          const response = await apiGetLocation()
          if (response?.data.err === 0){
            setlocations(response.data.response)
          }}
        fetchLocations()
      }, [])
    
    useEffect(() => {
        const letcreate = async () => {
            const response = await apiupdateTour(queries)
            setcheck(false)
            if (response?.data.err ===0){
                Swal.fire('Thành công', 'Đã sửa thông tin giải đấu', 'success').then(()=> {
                    setedittour(false)
                    getyourtour()
                })
            } else {
                Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
            }
        }
        {check && letcreate()}

      }, [check])

    const handlesubmit = (e, location, name) => {
        {e && e.stopPropagation()}
        setisShowModal(false)
        setqueries(prev => ({...prev, location: location}))
        {name && settexts(name)}     
    }

    const handletour = () => {
        setcheck(true)
    }

    const handleShowModal = (content, name) => {
        setisShowModal(true)
        setcontent(content)
        setlocationname(name)
      }

    return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center' onClick={e => {
        e.stopPropagation()
        setedittour(false)
    }}>
        <div onClick={e => e.stopPropagation()} className='bg-gray-500'>
            <div className='px-6'>
                <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Sửa thông tin giải đấu</h1>
                <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >Tên giải đấu</span>
                        <input defaultValue={queries.name} onChange={(e) => setqueries(prev => ({...prev, name: e.target.value}))} className='w-[760px] h-[36px] rounded-md'/>
                    </div>
                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Địa điểm</span>
                            <span onClick={() => handleShowModal(locations, 'locations')} className='cursor-pointer'><Selectbox text = {!(texts==='')? texts : queries.tlocation.name}/></span>
                            {isShowModal && <Modal handlesubmit={handlesubmit} content= {content} setisShowModal={setisShowModal} name={locationname} />}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Số đội tham dự</span>
                            <input defaultValue={queries.maxteam} onChange={(e) => setqueries(prev => ({...prev, maxteam: e.target.value}))} type='number' className='w-[300px] h-[36px] rounded-md'/>               
                        </div>
                    </div>

                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Thời gian bắt đầu</span>
                            <input defaultValue={queries.begin} onChange={(e) => setqueries(prev => ({...prev, begin: e.target.value}))} type='date' className='w-[300px] h-[36px] rounded-md'/>  
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Thời gian kết thúc</span>
                            <input defaultValue={queries.end} onChange={(e) => setqueries(prev => ({...prev, end: e.target.value}))} type='date' className='w-[300px] h-[36px] rounded-md'/>               
                        </div>
                    </div>

                    <div className='flex justify-start'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Thể thức thi đấu</span>
                            <div className='gap-10 flex'>
                                <span className='text-white'><input defaultChecked={queries.type===1} onChange={(e) => setqueries(prev => ({...prev, type: 1}))} type='radio' name='type'/> Đá vòng tròn</span>  
                                <span className='text-white'><input defaultChecked={queries.type===2} onChange={(e) => setqueries(prev => ({...prev, type: 2}))} type='radio' name='type'/> Chia bảng</span>   
                                <span className='text-white'><input defaultChecked={queries.type===3} onChange={(e) => setqueries(prev => ({...prev, type: 3}))} type='radio' name='type'/> Loại trực tiếp</span>   
                                <span className='text-white'><input defaultChecked={queries.type===4} onChange={(e) => setqueries(prev => ({...prev, type: 4}))} type='radio' name='type'/> Hệ Thụy Sỹ</span>  
                            </div>
                            {!(queries.type===3) && <div className='flex gap-10 items-center'>
                                <span className='text-white'>Số lượt đá</span>
                                <input defaultValue={queries.turn} onChange={(e) => setqueries(prev => ({...prev, turn: e.target.value}))} type='number' className='w-[300px] h-[36px] rounded-md'/>
                            </div>}
                        </div>
                    </div>
                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Số hiệp một trận</span>
                            <input defaultValue={queries.round} onChange={(e) => setqueries(prev => ({...prev, round: e.target.value}))} type='number' className='w-[300px] h-[36px] rounded-md'/>               
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Thời gian một hiệp (phút)</span>
                            <input defaultValue={queries.roundtime} onChange={(e) => setqueries(prev => ({...prev, roundtime: e.target.value}))} type='number' className='w-[300px] h-[36px] rounded-md'/>               
                        </div>
                    </div>

                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Số cầu thủ một đội</span>
                            <input defaultValue={queries.players} onChange={(e) => setqueries(prev => ({...prev, players: e.target.value}))} type='number' className='w-[300px] h-[36px] rounded-md'/>               
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Email liên hệ</span>
                            <input defaultValue={queries.email} onChange={(e) => setqueries(prev => ({...prev, email: e.target.value}))} type='email' className='w-[300px] h-[36px] rounded-md'/>               
                        </div>
                    </div>

                    <button className='bg-second w-[760px] h-[40px]' type='button' onClick={handletour}>Sửa giải</button>
                </div>
            </div>   
        </div>
    </div>
  )
}

export default UpdateTour