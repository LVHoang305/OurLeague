import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from '../../components'
import { apiGetAllUser, apideleteuser } from '../../services/user'
import UpdateAccount from '../../components/UpdateAccount'

const ManageAccount = () => {
    const {userData} = useSelector(state => state.user)
    const [teams, setteams] = useState([])
    const [check, setcheck] = useState(false)
    const [editaccount, seteditaccount] = useState(false)
    const [dataedit, setdataedit] = useState({})

    useEffect(() => {
        {userData && fetchteams()}
      }, [check])
      const fetchteams = async () => {
        if (userData.role===1) {
            const response = await apiGetAllUser()
            if (response?.data.err === 0){
                setteams(response.data.response.rows)
      }}}
    
      const handledeletepost = async (id) => {
        const response = await apideleteuser(id)
        fetchteams()
      }
      return (
        <div>
        <table className='w-full bg-white'>
                <thead>
                    <tr className='border text-center p-2'>
                        <th className='border text-center p-2'>ID</th>
                        <th className='border text-center p-2'>Tài khoản</th>
                        <th className='border text-center p-2'>Số điện thoại</th>
                        <th className='border text-center p-2'>Email</th>
                        <th className='border text-center p-2'>Họ và tên đệm</th>
                        <th className='border text-center p-2'>Tên</th>
                        <th className='border text-center p-2'>Role</th>
                        <th className='border text-center p-2'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {!teams.length 
                        ? <tr>
                            <td>Hệ thống không có tài khoản nào</td>
                        </tr>
                        : teams?.map(item => {
                            return(
                                <tr className='h-[50px]' key={item.id}>
                                    <td className='border text-center p-2'>{item?.id}</td>
                                    <td className='border text-center p-2'>{item?.username}</td>
                                    <td className='border text-center p-2'>{item?.phone}</td>
                                    <td className='border text-center p-2'>{item?.email}</td>
                                    <td className='border text-center p-2'>{item?.firstName}</td>
                                    <td className='border text-center p-2'>{item?.lastName}</td>
                                    <td className='border text-center p-2'>{item?.role}</td>
                                    <td className='border h-[50px] text-center item-center p-2 flex flex-1 justify-around'>
                                        <Button text='Sửa' onClick={() => {
                                            setdataedit(item)
                                            seteditaccount(true)
                                            }}/>
                                        <Button text='Xóa' onClick={() => handledeletepost(item.id)}/>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {editaccount && <UpdateAccount dataedit={dataedit} seteditaccount={seteditaccount} fetchteams={fetchteams} />}
        </div>
      )
    }
export default ManageAccount