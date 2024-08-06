import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { apiCreateTeam} from '../../services/team'
import Swal from 'sweetalert2'

const CreateTeam = () => {
  const {userData} = useSelector(state => state.user)
  const [check, setcheck] = useState(false)
  const [queries, setqueries] = useState(() => {
    const initData = {
        name: '',
        owner: userData.id || 0,
        coach: '',
        phone: '',
        email: '',

    }
    return initData
})


  useEffect(() => {
    const letcreate = async () => {
        const response = await apiCreateTeam(queries)
        setcheck(false)
        if (response?.data.err ===0){
            Swal.fire('Thành công', 'Đã thêm giải đấu mới', 'success').then(()=> {
                setqueries({})
            })
        } else {
            Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
        }
    }
    {check && letcreate()}

  }, [check])


  return (
    <div className='px-6'>
      <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Tạo đội bóng mới</h1>
        <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
          <div className='flex flex-col gap-2'>
            <span className='text-white' >Tên đội bóng</span>
            <input onChange={(e) => setqueries(prev => ({...prev, name: e.target.value}))} className='w-[760px] h-[36px] rounded-md'/>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-white' >Huấn luyện viên</span>
            <input onChange={(e) => setqueries(prev => ({...prev, coach: e.target.value}))} className='w-[760px] h-[36px] rounded-md'/>
          </div>
          <div className='flex justify-start gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white'>Số điện thoại</span>
              <input onChange={(e) => setqueries(prev => ({...prev, phone: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>  
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white'>Email</span>
              <input onChange={(e) => setqueries(prev => ({...prev, email: e.target.value}))} type='email' className='w-[300px] h-[36px] rounded-md'/>               
            </div>
          </div>
        <button className='bg-second w-[760px] h-[40px]' onClick={() => setcheck(true)} type='button' >Tạo đội bóng</button>
      </div>
    </div>
  )
}

export default CreateTeam