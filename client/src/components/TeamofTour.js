import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import Button from './Button'
import { apiGetTeamJoinTour, apiupdatejointour } from '../services/tour'

const TeamofTour = ({tourid, setgetteam}) => {

    const [usertours, setusertours] = useState([])
    const [check, setcheck] = useState(false)

    const [queries, setqueries] = useState(() => {
        const initData = {
            id: 0,
            state: 0,
        }
        return initData
    })
    useEffect(() => {
        const fetchteam = async () => {
          const response = await apiGetTeamJoinTour({tourid: tourid})
          if (response?.data.err === 0){
            setusertours(response.data.response.rows)
          }}
        fetchteam()
    }, [])

    useEffect(() => {
        const letcreate = async () => {
            const response = await apiupdatejointour(queries)
            setcheck(false)
            if (response?.data.err ===0){
                Swal.fire('Thành công', 'Đã duyệt/từ chối đội bóng thành công', 'success').then(()=> {
                    //setgetteam(false)
                    //getyourtour()
                })
            } else {
                Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
            }
        }
        {check && letcreate()}

      }, [check])

    const showstate = (state) => {
        let stringstate = ''
        if (state === 0)
            stringstate = 'Chờ duyệt'
        if (state === 1)
            stringstate = 'Đã duyệt'
        if (state === 2)
            stringstate = 'Đã từ chối'
        return stringstate
        
    }

    return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center' onClick={e => {
        e.stopPropagation()
        setgetteam(false)
    }}>
        <div onClick={e => e.stopPropagation()} className='bg-gray-500'>
            <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Danh sách đội bóng đăng ký</h1>
            <table className='w-full bg-white'>
                <thead>
                    <tr className='border text-center p-2'>
                        <th className='border text-center p-2'>ID</th>
                        <th className='border text-center p-2'>Tên đội bóng</th>
                        <th className='border text-center p-2'>Huấn luyện viên</th>
                        <th className='border text-center p-2'>Số điện thoại</th>
                        <th className='border text-center p-2'>Email</th>
                        <th className='border text-center p-2'>Trạng thái</th>
                        <th className='border text-center p-2'>Tùy chọn</th>
                    </tr>
                </thead> 
                <tbody>
                {!(usertours.length > 0)
                    ? <tr>
                        <td>Chưa có đội bóng nào đăng ký tham gia giải đấu.</td>
                    </tr>
                    : usertours?.map(item => {
                        return(
                            <tr className='h-[50px]' key={item.id}>
                                <td className='border text-center p-2'>{item?.team?.id}</td>
                                <td className='border text-center p-2'>{item?.team?.name}</td>
                                <td className='border text-center p-2'>{item?.team?.coach}</td>
                                <td className='border text-center p-2'>{item?.team?.phone}</td>
                                <td className='border text-center p-2'>{item?.team?.email}</td>
                                <td className='border text-center p-2'>{showstate(+item?.state)}</td>                   
                                <td className='border h-[50px] text-center item-center p-2 flex flex-1 justify-around'>
                                    <Button text='Duyệt' onClick={() => {
                                        setqueries(prev => ({...prev, id: item.id }))
                                        setqueries(prev => ({...prev, state: 1 }))
                                        setcheck(true)
                                        }}/>
                                    <Button text='Từ chối' onClick={() => {
                                        setqueries(prev => ({...prev, id: item.id }))
                                        setqueries(prev => ({...prev, state: 2 }))
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

export default TeamofTour