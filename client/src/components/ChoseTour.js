import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import Button from './Button'
import { apicreateMatch } from '../services/match'

const ChoseTour = ({queries, setqueries, settour}) => {

    const [check, setcheck] = useState(false)

    useEffect(() => {
        const letcreate = async () => {
            const response = await apicreateMatch(queries)
            setcheck(false)
            if (response?.data.err ===0){
                Swal.fire('Thành công', 'Đã đăng ký tham gia giải đấu thành công', 'success').then(()=> {
                    settour(false)
                    //getyourtour()
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
        settour(false)
    }}>
        <div onClick={e => e.stopPropagation()} className='bg-gray-500'>
            <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Danh sách đội bóng của bạn</h1>
            <table className='w-full bg-white'>
                <thead>
                    <tr className='border text-center p-2'>
                        <th className='border text-center p-2'>ID</th>
                        <th className='border text-center p-2'>Tên đội bóng</th>
                        <th className='border text-center p-2'>Huấn luyện viên</th>
                        <th className='border text-center p-2'>Số điện thoại</th>
                        <th className='border text-center p-2'>Email</th>
                        <th className='border text-center p-2'>Tùy chọn</th>
                    </tr>
                </thead> 
                <tbody>
                {!(team.length > 0)
                    ? <tr>
                        <td>Bạn không có đội bóng nào.</td>
                    </tr>
                    : team?.map(item => {
                        return(
                            <tr className='h-[50px]' key={item.id}>
                                <td className='border text-center p-2'>{item?.id}</td>
                                <td className='border text-center p-2'>{item?.name}</td>
                                <td className='border text-center p-2'>{item?.coach}</td>
                                <td className='border text-center p-2'>{item?.phone}</td>
                                <td className='border text-center p-2'>{item?.email}</td>                 
                                <td className='border h-[50px] text-center item-center p-2 flex flex-1 justify-around'>
                                    <Button text='Chọn' onClick={() => {
                                        setqueries(prev => ({...prev, teamid: item?.id}))
                                        setcheck(true)
                                        }}/>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
        </div>
    </div>   

  )
}

export default ChoseTour