import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from '../../components'
import { apiGetMatch, apideleteMatch } from '../../services/match'
import UpdateMatch from '../../components/UpdateMatch'

function ManageMatch() {
  const {userData} = useSelector(state => state.user)
  const [teams, setteams] = useState([])
  const [check, setcheck] = useState(false)
  const [editmatch, seteditmatch] = useState(false)
  const [dataedit, setdataedit] = useState({})

  useEffect(() => {
    {userData && fetchteams()}
  }, [check])
  const fetchteams = async () => {
    if (userData.role===1) {
        const response = await apiGetMatch()
        if (response?.data.err === 0){
            setteams(response.data.response.rows)
    }}
    if (userData.role===0){
        const response = await apiGetMatch({reporter:userData.id})
        if (response?.data.err === 0){
            setteams(response.data.response.rows)
  }}}

  const handledeletepost = async (id) => {
    const response = await apideleteMatch(id)
    fetchteams()
  }
  return (
    <div>
    <table className='w-full bg-white'>
            <thead>
                <tr className='border text-center p-2'>
                    <th className='border text-center p-2'>Trận</th>
                    <th className='border text-center p-2'>Thời gian</th>
                    <th className='border text-center p-2'>Tỉ số</th>
                    <th className='border text-center p-2'>Thẻ vàng</th>
                    <th className='border text-center p-2'>Thẻ đỏ</th>
                    <th className='border text-center p-2'>Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                {!teams.length 
                    ? <tr>
                        <td>Bạn chưa ghi trận đấu nào.</td>
                    </tr>
                    : teams?.map(item => {
                        return(
                            <tr className='h-[50px]' key={item.id}>
                                <td className='border text-center p-2'>{item?.TeamA.name} vs {item?.TeamB.name}</td>
                                <td className='border text-center p-2'>{item?.date.slice(0,10)}  {item?.begin} - {item?.end}</td>
                                <td className='border text-center p-2'>{item?.goalA} - {item?.goalB}</td>
                                <td className='border text-center p-2'>{item?.yellowA} - {item?.yellowB}</td>
                                <td className='border text-center p-2'>{item?.redA} - {item?.redB}</td>
                                <td className='border h-[50px] text-center item-center p-2 flex flex-1 justify-around'>
                                    <Button text='Sửa' onClick={() => {
                                        setdataedit(item)
                                        seteditmatch(true)
                                        }}/>
                                    <Button text='Xóa' onClick={() => handledeletepost(item.id)}/>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
        {editmatch && <UpdateMatch dataedit={dataedit} seteditmatch={seteditmatch} fetchteams={fetchteams} />}

    </div>
  )
}

export default ManageMatch