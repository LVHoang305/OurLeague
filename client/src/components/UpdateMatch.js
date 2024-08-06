import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiupdateMatch } from '../services/match'
import { apiGetTourLimitAdmin, apiGetTour } from '../services/tour'
import Swal from 'sweetalert2'
import Modal from './Modal'
import Selectbox from './Selectbox'

const UpdateMatch = ({dataedit, seteditmatch, fetchteams}) => {
  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.user)
  const [usertours, setusertours] = useState([]) 
  const [check, setcheck] = useState(false)
  const [name, setname] = useState('')
  const [texts, settexts] = useState('')
  const [isShowModal, setisShowModal] = useState(false)
  const [content, setcontent] = useState([])
  const [queries, setqueries] = useState(() => {
    const initData = {
      teamA: dataedit?.teamA || 0,
      teamB: dataedit?.teamB || 0,
      begin: dataedit?.begin || '00:00',
      end: dataedit?.end || '00:00',
      goalA: dataedit?.goalA || 0,
      goalB: dataedit?.goalB || 0,
      redA: dataedit?.redA || 0,
      redB: dataedit?.redB || 0,
      yellowA: dataedit?.yellowA || 0,
      yellowB: dataedit?.yellowB || 0,
      reporter: dataedit?.reporter || 0,
      date: dataedit?.date || '',
      intour: dataedit?.intour || 0
    }
    return initData
})

    const getyourtour = async () => {
    if (userData.role===1) {
        const response = await apiGetTour()
          if (response?.data.err === 0){
          setusertours(response.data.response.rows)
      }}
      if (userData.role===0) {
        const response = await apiGetTourLimitAdmin({owner:userData.id})
          if (response?.data.err === 0){
          setusertours(response.data.response.rows)
      }}}

  useEffect(() => {
    getyourtour()
  },[])

  const handlesubmit = (e, id, name) => {
    {e && e.stopPropagation()}
    setisShowModal(false)
    setqueries(prev => ({...prev, intour: id}))
    {name && settexts(name)}
    
  }

  useEffect(() => {
      const letcreate = async () => {
        const response = await apiupdateMatch(queries)
        setcheck(false)
        if (response?.data.err ===0){
            Swal.fire('Thành công', 'Đã thêm trận đấu mới', 'success').then(()=> {
                setqueries({})
                seteditmatch(false)
                fetchteams()
            })
        } else {
            Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
        }
    }
    {check && letcreate()}

  }, [check])

  const handleShowModal = (content, name) => {
    setisShowModal(true)
    setcontent(content)
    setname(name)

  }

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center' onClick={e => {
        e.stopPropagation()
        seteditmatch(false)
    }}>
        <div onClick={e => e.stopPropagation()} className='bg-gray-500'>
    <div className='px-6'>
      <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Tạo trận đấu mới</h1>
        <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
          <div className='flex justify-start gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >ID đội A</span>
              <input onChange={(e) => setqueries(prev => ({...prev, teamA: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >ID đội B</span>
              <input onChange={(e) => setqueries(prev => ({...prev, teamB: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-white'>Ngày</span>
            <input onChange={(e) => setqueries(prev => ({...prev, date: e.target.value}))} type='date' className='w-[760px] h-[36px] rounded-md'/>  
          </div>
          <div className='flex justify-start gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white'>Bắt đầu</span>
              <input onChange={(e) => setqueries(prev => ({...prev, begin: e.target.value}))} type='time' defaultValue={queries.begin} className='w-[300px] h-[36px] rounded-md'/>  
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white'>Kết thúc</span>
              <input onChange={(e) => setqueries(prev => ({...prev, end: e.target.value}))} type='time' defaultValue={queries.end} className='w-[300px] h-[36px] rounded-md'/>               
            </div>
          </div>
          <div className='flex justify-start gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >Bàn thắng đội A</span>
              <input onChange={(e) => setqueries(prev => ({...prev, goalA: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >Bàn thắng đội B</span>
              <input onChange={(e) => setqueries(prev => ({...prev, goalB: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
          </div>
          <div className='flex justify-start gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >Thẻ vàng đội A</span>
              <input onChange={(e) => setqueries(prev => ({...prev, yellowA: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >Thẻ vàng đội B</span>
              <input onChange={(e) => setqueries(prev => ({...prev, yellowB: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
          </div>
          <div className='flex justify-start gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >Thẻ đỏ đội A</span>
              <input onChange={(e) => setqueries(prev => ({...prev, redA: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >Thẻ đỏ đội B</span>
              <input onChange={(e) => setqueries(prev => ({...prev, redB: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
          </div>
          <div className='flex justify-start items-center gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white'>Giải đấu</span>
              <span onClick={() => handleShowModal(usertours, 'tour')} className='cursor-pointer'><Selectbox text = {!(texts==='')? texts : 'Giải đấu'}/></span>
              {isShowModal && <Modal handlesubmit={handlesubmit} content= {content} setisShowModal={setisShowModal} name={name} />}
            </div>
            <button className='bg-third w-[300px] h-[40px]' onClick={() => {
              setqueries(prev => ({...prev, intour: 0}))
              settexts('')
              }} type='button' >Không trong giải đấu</button>

          </div>
        <button className='bg-second w-[760px] h-[40px]' onClick={() => setcheck(true)} type='button' >Tạo trận đấu</button>
      </div>
    </div>
    </div>
    </div>
  )
}

export default UpdateMatch