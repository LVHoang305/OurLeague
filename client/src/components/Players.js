import React, {useEffect, useState} from 'react'
import Button from './Button'
import { apiGetPlayers, apideletePlayer } from '../services/team'
import CreatePlayer from './CreatePlayer'
import { apiupdateTeam } from '../services/team'
import Swal from 'sweetalert2'

const Players = ({teamid, slct, setgetplayers}) => {

    const [usertours, setusertours] = useState([])
    const [dataeditplayer, setdataeditplayer] = useState({})
    const [editplayer, seteditplayer] = useState(false)
    const [newplayer, setnewplayer] = useState(false)
    const [check, setcheck] = useState(false)
    const [queries, setqueries] = useState(() => {
        const initData = {
            id: teamid || 0,
            subowner: slct || 0,
        }
        return initData
    })

    useEffect(() => {
        const letcreate = async () => {
            const response = await apiupdateTeam(queries)
            setcheck(false)
        }
        {check && letcreate()}

      }, [check])
    
    useEffect(() => { 
        fetchteam()
    }, [])
    const fetchteam = async () => {
        const response = await apiGetPlayers({team: teamid})
        if (response?.data.err === 0){
            setusertours(response.data.response.rows)
        }}

    const handledeleteplayer = async (id) => {
        const response = await apideletePlayer(id)
        if (response?.data.err ===0){
            Swal.fire('Thành công', 'Đã xóa cầu thủ', 'success').then(()=> {
                fetchteam()
                setqueries(prev => ({...prev, subowner: +(queries.subowner-1)}))
                setcheck(true)
            })
        } else {
            Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
        }
    }

    return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center' onClick={e => {
        e.stopPropagation()
        setgetplayers(false)
    }}>
        <div onClick={e => e.stopPropagation()} className='bg-gray-500'>
            <div className='flex justify-center gap-[280px] border-b border-gray-200 py-4'>
                <h1 className='text-white text-3xl font-medium'>Danh sách cầu thủ</h1>
                <Button text='Thêm cầu thủ mới' bgColor={'bg-second'} textColor={'text-white'} onClick={() => {
                    setdataeditplayer({})
                    setnewplayer(true)
                    seteditplayer(true)
                }}/>
            </div>
            <table className='w-full bg-white'>
                <thead>
                    <tr className='border text-center p-2'>
                        <th className='border text-center p-2'>ID</th>
                        <th className='border text-center p-2'>Tên</th>
                        <th className='border text-center p-2'>Chiều cao</th>
                        <th className='border text-center p-2'>Cân nặng</th>
                        <th className='border text-center p-2'>Số áo</th>
                        <th className='border text-center p-2'>Số điện thoại</th>
                        <th className='border text-center p-2'>CCCD/CMND</th>
                        <th className='border text-center p-2'>Tùy chọn</th>
                    </tr>
                </thead> 
                <tbody>
                {!(usertours.length > 0)
                    ? <tr>
                        <td>Đội của bạn chưa có cầu thủ nào.</td>
                    </tr>
                    : usertours?.map(item => {
                        return(
                            <tr className='h-[50px]' key={item.id}>
                                <td className='border text-center p-2'>{item?.id}</td>
                                <td className='border text-center p-2'>{item?.name}</td>
                                <td className='border text-center p-2'>{item?.height}</td>
                                <td className='border text-center p-2'>{item?.weight}</td>
                                <td className='border text-center p-2'>{item?.number}{item?.cap && ' (C)'}</td>
                                <td className='border text-center p-2'>{item?.phone}</td>
                                <td className='border text-center p-2'>{item?.identify}</td>                     
                                <td className='border h-[50px] text-center item-center p-2 flex flex-1 justify-around'>
                                    <Button text='Sửa' onClick={() => {
                                        setdataeditplayer(item)
                                        setnewplayer(false)
                                        seteditplayer(true)
                                        }}/>
                                    <Button text='Xóa' onClick={() => {
                                        handledeleteplayer(item.id)
                                    }}/>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
        {editplayer && <CreatePlayer fetchteam={fetchteam} slct= {queries.subowner} teamid={teamid} newplayer={newplayer} dataeditplayer={dataeditplayer} seteditplayer={seteditplayer}/>}
        </div>
    </div>   

  )
}

export default Players