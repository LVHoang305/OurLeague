import React, {useEffect, useState} from 'react'
import Modal from './Modal'
import { apiGetLocation } from '../services/location'
import { Selectbox } from '../components'
import { useSelector } from 'react-redux'


const InputTour = ({queries, setqueries}) => {
    const {userData} = useSelector(state => state.user)
    const [locations, setlocations] = useState([])
    const [isShowModal, setisShowModal] = useState(false)
    const [content, setcontent] = useState([])
    const [locationname, setlocationname] = useState('')
    const [texts, settexts] = useState('')
    const [name, setname] = useState('')
    const [location, setlocation] = useState(0)
    const [maxteam, setmaxteam] = useState(0)
    const [begin, setbegin] = useState('')
    const [end, setend] = useState('')
    const [type, settype] = useState(1)
    const [turn, setturn] = useState(0)
    const [round, setround] = useState(1)
    const [roundtime, setroundtime] = useState(0)
    const [players, setplayers] = useState('')
    const [email, setemail] = useState('')


    useEffect(() => {
        const fetchLocations = async () => {
          const response = await apiGetLocation()
          if (response?.data.err === 0){
            setlocations(response.data.response)
          }}
        fetchLocations()
      }, [])

    const handlesubmit = (e, location, name) => {
        {e && e.stopPropagation()}
        setisShowModal(false)
        setlocation(location)
        {name && settexts(name)}
        
    }
    const handletour = () => {
        setqueries(prev => ({...prev,name}))
        setqueries(prev => ({...prev,location}))
        setqueries(prev => ({...prev,maxteam}))
        setqueries(prev => ({...prev,begin}))
        setqueries(prev => ({...prev,end}))
        setqueries(prev => ({...prev,type}))
        setqueries(prev => ({...prev,turn}))
        setqueries(prev => ({...prev,round}))
        setqueries(prev => ({...prev,roundtime}))
        setqueries(prev => ({...prev,players}))
        setqueries(prev => ({...prev,email}))

    }

    const handleShowModal = (content, name) => {
        setisShowModal(true)
        setcontent(content)
        setlocationname(name)
      }
    return (
    <div className='px-6'>
            <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Tạo giải đấu mới</h1>
            <div className='py-4 flex flex-col gap-4 flex-auto'>
                <div className='flex flex-col gap-2'>
                    <span className='text-white' >Tên giải đấu</span>
                    <input onChange={(e) => setname(e.target.value)} className='w-[760px] h-[36px] rounded-md'/>
                </div>
                <div className='flex justify-start gap-40'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Địa điểm</span>
                        <span onClick={() => handleShowModal(locations, 'locations')} className='cursor-pointer'><Selectbox text = {!(texts==='')? texts : 'Địa điểm'}/></span>
                        {isShowModal && <Modal handlesubmit={handlesubmit} content= {content} setisShowModal={setisShowModal} name={locationname} />}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Số đội tham dự</span>
                        <input onChange={(e) => setmaxteam(+e.target.value)}type='number' className='w-[300px] h-[36px] rounded-md'/>               
                    </div>
                </div>

                <div className='flex justify-start gap-40'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Thời gian bắt đầu</span>
                        <input onChange={(e) => setbegin(e.target.value)} type='date' className='w-[300px] h-[36px] rounded-md'/>  
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Thời gian kết thúc</span>
                        <input onChange={(e) => setend(e.target.value)} type='date' className='w-[300px] h-[36px] rounded-md'/>               
                    </div>
                </div>

                <div className='flex justify-start'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Thể thức thi đấu</span>
                        <div className='gap-10 flex'>
                            <span className='text-white'><input defaultChecked={true} onChange={() => settype(1)} type='radio' name='type'/> Đá vòng tròn</span>  
                            <span className='text-white'><input onChange={() => settype(2)} type='radio' name='type'/> Chia bảng</span>   
                            <span className='text-white'><input onChange={() => settype(3)} type='radio' name='type'/> Loại trực tiếp</span>   
                            <span className='text-white'><input onChange={() => settype(4)} type='radio' name='type'/> Hệ Thụy Sỹ</span>  
                        </div>
                        {!(type===3) && <div className='flex gap-10 items-center'>
                            <span className='text-white'>Số lượt đá</span>
                            <input onChange={(e) => setturn(+e.target.value)}type='number' className='w-[300px] h-[36px] rounded-md'/>
                        </div>}
                    </div>
                </div>
                <div className='flex justify-start gap-40'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Số hiệp một trận</span>
                        <input onChange={(e) => setround(+e.target.value)}type='number' className='w-[300px] h-[36px] rounded-md'/>               
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Thời gian một hiệp (phút)</span>
                        <input onChange={(e) => setroundtime(+e.target.value)}type='number' className='w-[300px] h-[36px] rounded-md'/>               
                    </div>
                </div>

                <div className='flex justify-start gap-40'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Số cầu thủ một đội</span>
                        <input onChange={(e) => setplayers(+e.target.value)}type='number' className='w-[300px] h-[36px] rounded-md'/>               
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white'>Email liên hệ</span>
                        <input onChange={(e) => setemail(e.target.value)}type='email' className='w-[300px] h-[36px] rounded-md'/>               
                    </div>
                </div>

                <button type='button' onClick={handletour}>Done</button>
            </div>
        </div>
  )
}

export default InputTour