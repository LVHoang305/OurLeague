import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions'
import {Button, UpdateTour, TeamofTour} from '../../components'
import { apideleteTour } from '../../services/tour'
import { Pagination } from '../Public'
import { useSearchParams } from 'react-router-dom'
import { apiGetTourLimitAdmin, apiGetTour } from '../../services/tour'

const ManageTour = () => {
    const {userData} = useSelector(state => state.user)
    //const {usertours} = useSelector(state => state.tour)
    const [usertours, setusertours] = useState([]) 
    const [edittour, setedittour] = useState(false)
    const [dataedit, setdataedit] = useState({})
    const [getteam, setgetteam] = useState(false)
    const [tourid, settourid] = useState(0)
    const dispatch = useDispatch()
    const [params] = useSearchParams()
    const type = [
        'Thể thức', 'Đá vòng tròn', 'Chia bảng','Loại trực tiếp', 'Hệ Thụy Sỹ'
    ]
    const getyourtour = async () => {
        //dispatch(actions.GetToursLimitAdmin({staff:userData.id}))
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
    useEffect(() => {
        let paramss = []
        for (let entry of params.entries()){
          paramss.push(entry)
        }
        let searchParamsObject = {staff:userData.id}
        paramss?.map(i => {searchParamsObject = {...searchParamsObject, [i[0]]:i[1] }})
        dispatch(actions.GetToursLimitAdmin(searchParamsObject))
      }, [params])
    
    const handledeletepost = async (id) => {
        const response = await apideleteTour(id)
        getyourtour()
    }
    const ConvertDate = str => {
        try {
          const [date,time] = str.split("T");
          str = date
          const [year,month,day] = str.split("-");
          str = `${day}-${month}-${year}`
        } catch (error) {
        }
        return str
    }

    return (
    <div className='relative h-[680px]'>
        <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Danh sách giải đấu</h1>
        <table className='w-full bg-white'>
            <thead>
                <tr className='border text-center p-2'>
                    <th className='border text-center p-2'>ID</th>
                    <th className='border text-center p-2'>Tên giải đấu</th>
                    <th className='border text-center p-2'>Địa điểm</th>
                    <th className='border text-center p-2'>Thời gian bắt đầu</th>
                    <th className='border text-center p-2'>Thời gian kết thúc</th>
                    <th className='border text-center p-2'>Số đội tham gia</th>
                    <th className='border text-center p-2'>Thể thức</th>
                    <th className='border text-center p-2'>Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                {!usertours 
                    ? <tr>
                        <td>Bạn không có giải đấu nào.</td>
                    </tr>
                    : usertours?.map(item => {
                        return(
                            <tr className='h-[50px]' key={item.id}>
                                <td className='border text-center p-2'>{item?.id}</td>
                                <td className='border text-center p-2'>{item?.name}</td>
                                <td className='border text-center p-2'>{item?.tlocation.name}</td>
                                <td className='border text-center p-2'>{ConvertDate(item?.begin)}</td>
                                <td className='border text-center p-2'>{ConvertDate(item?.end)}</td>
                                <td className='border text-center p-2'>{item?.maxteam}</td>
                                <td className='border text-center p-2'>{type[item?.type]}</td>
                            
                                <td className='border h-[50px] text-center item-center p-2 flex flex-1 justify-around'>
                                    <Button text='Đội bóng' onClick={() => {
                                        settourid(item?.id)
                                        setgetteam(true)

                                        }}/>
                                    <Button text='Sửa' onClick={() => {
                                        setdataedit(item)
                                        setedittour(true)

                                        }}/>
                                    <Button text='Xóa' onClick={() => handledeletepost(item.id)}/>
                                </td>

                            </tr>
                        )
                    })}
            </tbody>
        </table>
        {edittour && <UpdateTour dataedit={dataedit} setedittour={setedittour} getyourtour={getyourtour}/> }
        {getteam && <TeamofTour tourid={tourid} setgetteam={setgetteam}/> }
        <Pagination/>
    </div>
  )
}

export default ManageTour