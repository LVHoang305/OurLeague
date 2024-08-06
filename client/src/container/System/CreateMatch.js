import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apicreateMatch } from '../../services/match'
import Swal from 'sweetalert2'
import Modal from '../../components/Modal'
import { Selectbox } from '../../components'
import * as actions from '../../store/actions'

const CreateMatch = () => {
  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.user)
  const {usertours} = useSelector(state => state.tour) 
  const [check, setcheck] = useState(false)
  const [name, setname] = useState('')
  const [texts, settexts] = useState('')
  const [isShowModal, setisShowModal] = useState(false)
  const [content, setcontent] = useState([])
  const [queries, setqueries] = useState(() => {
    const initData = {
      teamA: 0,
      teamB: 0,
      begin: '00:00',
      end: '00:00',
      goalA: 0,
      goalB: 0,
      redA: 0,
      redB: 0,
      yellowA: 0,
      yellowB: 0,
      reporter: userData.id || 0,
      date: '',
      intour: 0
    }
    return initData
})

  const getyourtour = () => {
    dispatch(actions.GetToursLimitAdmin({staff:userData.id}))
  }

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
        const response = await apicreateMatch(queries)
        setcheck(false)
        if (response?.data.err ===0){
            Swal.fire('Thành công', 'Đã thêm trận đấu mới', 'success').then(()=> {
                setqueries({})
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
  )
}

export default CreateMatch