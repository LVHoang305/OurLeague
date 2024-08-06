import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { apiupdateUser} from '../../services/user'
import Swal from 'sweetalert2'

const Account = () => {
    const {userData} = useSelector(state => state.user)
    const [check, setcheck] = useState(false)
    const [queries, setqueries] = useState(() => {
        const initData = {
            id: userData?.id || 0,
            username: userData?.username || '',
            phone: userData?.phone || '',
            email: userData?.email || '',
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
        }
        return initData
    })

    const letupdate = async () => {
        const response = await apiupdateUser(queries)
        if (response?.data.err ===0){
            Swal.fire('Thành công', 'Đã sửa thông tin tài khoản', 'success').then(()=> {
                setqueries({
                    id: userData?.id || 0,
                    username: userData?.username || '',
                    phone: userData?.phone || '',
                    email: userData?.email || '',
                    firstName: userData?.firstName || '',
                    lastName: userData?.lastName || '',
                })
            })
        } else {
            Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
        }
    }
    
    useEffect(() => {
        {check && setqueries(prev => ({...prev, password: ''}))}
        {!check && delete queries.password}
    }, [check])
    return (
    <div className='px-6'>
            <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Thông tin tài khoản</h1>
            <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
                <h3 className='text-white text-xl'>Thông tin tài khoản</h3>
                <div className='flex justify-start gap-40'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >ID</span>
                        <input disabled={true} defaultValue={queries.id} className='w-[300px] h-[36px] rounded-md'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >Tài khoản</span>
                        <input disabled={true} defaultValue={queries.username} className='w-[300px] h-[36px] rounded-md'/>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <span className='text-white'>Đổi mật khẩu? </span>
                    <input type='checkbox' onChange={() => setcheck(!check)}/>
                </div>
                {check && <div className='flex gap-10 items-center'>
                            <span className='text-white'>Mật khẩu mới</span>
                            <input onChange={(e) => setqueries(prev => ({...prev, password: e.target.value}))} type='password' className='w-[400px] h-[36px] rounded-md'/>
                        </div>}

                <h3 className='text-white text-xl'>Thông tin cá nhân</h3>
                <div className='flex justify-start gap-40'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >Số điện thoại</span>
                        <input defaultValue={queries.phone} onChange={(e) => setqueries(prev => ({...prev, phone: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >Email</span>
                        <input defaultValue={queries.email} onChange={(e) => setqueries(prev => ({...prev, email: e.target.value}))} type='email' className='w-[300px] h-[36px] rounded-md'/>
                    </div>
                </div>

                <div className='flex justify-start gap-40'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >Họ và tên đệm</span>
                        <input defaultValue={queries.firstName} onChange={(e) => setqueries(prev => ({...prev, firstName: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-white' >Tên</span>
                        <input defaultValue={queries.lastName} onChange={(e) => setqueries(prev => ({...prev, lastName: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                    </div>
                </div>
                <button className='bg-second w-[760px] h-[40px]' onClick={letupdate} type='button'>Sửa thông tin</button>
            </div>
                

        </div>
  )
}

export default Account