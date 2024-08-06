import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { apiCreatePlayer, apiupdatePlayer } from '../services/team'
import { apiupdateTeam } from '../services/team'

const CreatePlayer = ({fetchteam,teamid, slct, newplayer, dataeditplayer, seteditplayer}) => {

    const [check, setcheck] = useState(false)
    const [checks, setchecks] = useState(false)
    const [queries, setqueries] = useState(() => {
        const initData = {
            id: dataeditplayer?.id || 0,
            name: dataeditplayer?.name || '',
            team: dataeditplayer?.team || teamid,
            height: dataeditplayer?.height || 0,
            weight: dataeditplayer?.weight || 0,
            cap: dataeditplayer?.cap || 0,
            number: dataeditplayer?.number || 0,
            birth: dataeditplayer?.birth?.slice(0,10) || '',
            phone: dataeditplayer?.phone || '',
            identify: dataeditplayer?.identify || '',
            idenfron: dataeditplayer?.idenfron || '',
            idenback: dataeditplayer?.idenback || ''
        }
        return initData
    })

    const [querie, setquerie] = useState(() => {
        const initData = {
            id: teamid || 0,
            subowner: slct || 0,
        }
        return initData
    })

    useEffect(() => {
        const letcreate = async () => {
            const response = await apiupdateTeam(querie)
            setchecks(false)
        }
        {check && letcreate()}

      }, [checks])

  useEffect(() => {
    const letcreate = async () => {
        const response = await apiCreatePlayer(queries)
        setcheck(false)
        if (response?.data.err ===0){
            Swal.fire('Thành công', 'Đã thêm cầu thủ', 'success').then(()=> {
                setqueries({})
                setquerie(prev => ({...prev, subowner: +(queries.subowner+1)}))
                setchecks(true)
                fetchteam()
            })
        } else {
            Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
        }
    }

    const letupdate = async () => {
        const response = await apiupdatePlayer(queries)
        setcheck(false)
        if (response?.data.err ===0){
            Swal.fire('Thành công', 'Đã sửa thông tin cầu thủ', 'success').then(()=> {
                setqueries({})
                fetchteam()
            })
        } else {
            Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
        }
    }

    if (check === true) newplayer ? letcreate() : letupdate()

  }, [check])


  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center' onClick={e => {
        e.stopPropagation()
        seteditplayer(false)
    }}>
        <div onClick={e => e.stopPropagation()} className='bg-gray-500'>
            <div className='px-6'>
                <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>{!newplayer && 'Sửa thông tin cầu thủ'}{newplayer && 'Thêm cầu thủ'}</h1>
                <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white' >Tên cầu thủ</span>
                            <input defaultValue={queries.name} onChange={(e) => setqueries(prev => ({...prev, name: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-white' >Đội trưởng</span>
                            <input defaultChecked={queries.cap} type='checkbox' onChange={() => setqueries(prev => ({...prev, cap: +!queries.cap}))} className='h-[36px] rounded-md'/>
                        </div>
                    </div>

                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Chiều cao</span>
                            <input defaultValue={queries.height} onChange={(e) => setqueries(prev => ({...prev, height: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Cân nặng</span>
                            <input defaultValue={queries.weight} onChange={(e) => setqueries(prev => ({...prev, weight: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                    </div>

                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Số áo</span>
                            <input defaultValue={queries.number} onChange={(e) => setqueries(prev => ({...prev, number: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Số điện thoại</span>
                            <input defaultValue={queries.phone} onChange={(e) => setqueries(prev => ({...prev, phone: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                    </div>

                    <div className='flex justify-start gap-40'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>CCCD/CMND</span>
                            <input defaultValue={queries.identify} onChange={(e) => setqueries(prev => ({...prev, identify: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-white'>Ngày sinh</span>
                            <input defaultValue={queries.birth} type='date' onChange={(e) => setqueries(prev => ({...prev, birth: e.target.value}))} className='w-[300px] h-[36px] rounded-md'/>
                        </div>
                    </div>
                    <button className='bg-second w-[760px] h-[40px]' type='button' onClick={() => {setcheck(true)}}>{!newplayer && 'Sửa thông tin cầu thủ'}{newplayer && 'Thêm cầu thủ'}</button>
                </div>
            </div>   
        </div>
    </div>
  )
}

export default CreatePlayer