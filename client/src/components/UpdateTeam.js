import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { apiupdateTeam } from '../services/team'

const UpdateTeam = ({dataedit, seteditteam, fetchteams}) => {
    //console.log(dataedit)
    const [check, setcheck] = useState(false)

    const [queries, setqueries] = useState(() => {
        const initData = {
            id: dataedit?.id || 0,
            name: dataedit?.name || '',
            coach: dataedit?.coach || 0,
            phone: dataedit?.phone || '',
            email: dataedit?.email || '',
            subowner: dataedit?.subowner || 0,
        }
        return initData
    })
    
    useEffect(() => {
        const letcreate = async () => {
            const response = await apiupdateTeam(queries)
            setcheck(false)
            if (response?.data.err ===0){
                Swal.fire('Thành công', 'Đã sửa thông tin đội bóng', 'success').then(()=> {
                    seteditteam(false)
                    fetchteams()
                })
            } else {
                Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
            }
        }
        {check && letcreate()}

      }, [check])

    const handletour = () => {
        setcheck(true)
    }

    return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center' onClick={e => {
        e.stopPropagation()
        seteditteam(false)
    }}>
        <div onClick={e => e.stopPropagation()} className='bg-gray-500'>
            <div className='px-6'>
                <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Sửa thông tin đội bóng</h1>
                <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >Tên đội bóng</span>
                        <input defaultValue={queries.name} onChange={(e) => setqueries(prev => ({...prev, name: e.target.value}))} className='w-[760px] h-[36px] rounded-md'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >Huấn luyện viên</span>
                        <input defaultValue={queries.coach} onChange={(e) => setqueries(prev => ({...prev, coach: e.target.value}))} className='w-[760px] h-[36px] rounded-md'/>
                    </div>
                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Số điện thoại</span>
                            <input defaultValue={queries.phone} onChange={(e) => setqueries(prev => ({...prev, phone: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Email</span>
                            <input defaultValue={queries.email} onChange={(e) => setqueries(prev => ({...prev, email: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                    </div>
                    <button className='bg-second w-[760px] h-[40px]' type='button' onClick={handletour}>Sửa thông tin đội</button>
                </div>
            </div>   
        </div>
    </div>
  )
}

export default UpdateTeam