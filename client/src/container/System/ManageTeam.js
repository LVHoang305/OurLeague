import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button, UpdateTeam, Players} from '../../components'
import { apiGetTeamLimitAdmin, apideleteTeam, apiGetTeam} from '../../services/team'

const ManageTeam = () => {
  const {userData} = useSelector(state => state.user)
  const [teams, setteams] = useState([])
  const [editteam, seteditteam] = useState(false)
  const [dataedit, setdataedit] = useState({})
  const [check, setcheck] = useState(false)
  const [getplayers, setgetplayers] = useState(false)
  const [teamid, setteamid] = useState(0)
  const [slct, setslct] = useState(0)
  useEffect(() => {
    {userData && fetchteams()}
  }, [check])
  const fetchteams = async () => {
    if (userData.role===1) {
      const response = await apiGetTeam()
        if (response?.data.err === 0){
        setteams(response.data.response.rows)
    }}
    if (userData.role===0) {
      const response = await apiGetTeamLimitAdmin({owner:userData.id})
        if (response?.data.err === 0){
        setteams(response.data.response.rows)
    }}}

  const handledeleteteam = async (id) => {
    const response = await apideleteTeam(id)
    fetchteams()
  }

  return (
    <div className='relative h-[680px]'>
        <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Danh sách đội bóng</h1>
        <table className='w-full bg-white'>
            <thead>
                <tr className='border text-center p-2'>
                    <th className='border text-center p-2'>ID</th>
                    <th className='border text-center p-2'>Tên đội bóng</th>
                    <th className='border text-center p-2'>Huấn luyện viên</th>
                    <th className='border text-center p-2'>Số điện thoại</th>
                    <th className='border text-center p-2'>Email</th>
                    <th className='border text-center p-2'>Số cầu thủ</th>
                    <th className='border text-center p-2'>Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                 {!teams 
                    ? <tr>
                        <td>Bạn không có đội bóng nào.</td>
                    </tr>
                    : teams?.map(item => {
                        return(
                            <tr className='h-[50px]' key={item.id}>
                                <td className='border text-center p-2'>{item?.id}</td>
                                <td className='border text-center p-2'>{item?.name}</td>
                                <td className='border text-center p-2'>{item?.coach}</td>
                                <td className='border text-center p-2'>{item?.phone}</td>
                                <td className='border text-center p-2'>{item?.email}</td>
                                <td className='border text-center p-2'>{item?.subowner}</td>
                            
                                <td className='border h-[50px] text-center item-center p-2 flex flex-1 justify-around'>
                                    <Button text='Cầu thủ' onClick={() => {
                                      setteamid(item.id)
                                      setslct(item.subowner)
                                      setgetplayers(true)
                                    }}/>
                                    <Button text='Sửa' onClick={() => {
                                      setdataedit(item)
                                      seteditteam(true)
                                    }}/>
                                    <Button text='Xóa' onClick={() => handledeleteteam(item.id)}/>
                                </td>

                            </tr>
                        )
                    })}
            </tbody>
          </table>
          {editteam && <UpdateTeam dataedit={dataedit} seteditteam={seteditteam} fetchteams={fetchteams} />}
          {getplayers && <Players teamid={teamid} slct={slct} setgetplayers={setgetplayers} />}

          {/* <Pagination/> */}
    </div>
  )
}

export default ManageTeam