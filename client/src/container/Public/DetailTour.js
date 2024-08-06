import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetToursLimit } from '../../store/actions'
import Button from '../../components/Button'
import { apiGetTeamJoinTour} from '../../services/tour'
import { apiGetTeamLimitAdmin } from '../../services/team'
import { apiGetMatch } from '../../services/match'
import JoinTour from '../../components/JoinTour'

const DetailTour = () => {
  const {tourId} = useParams()
  const {userData} = useSelector(state => state.user)
  const [team, setteam] = useState([])
  const dispatch = useDispatch()
  const {tours} = useSelector(state => state.tour)
  const [apply, setapply] = useState(false)
  const [reg, setreg] = useState(false)
  const [teams, setteams] = useState([])
  const [match, setmatch] = useState([])
  const type = [
    'Thể thức', 'Đá vòng tròn', 'Chia bảng','Loại trực tiếp', 'Hệ Thụy Sỹ'
]
  const fetchteams = async () => {
    const response = await apiGetTeamLimitAdmin({owner:userData.id})
    if (response?.data.err === 0){
      setteam(response.data.response.rows)
  }}
  const fetchmatchs = async () => {
    const response = await apiGetMatch({intour:tours[0].id})
    if (response?.data.err === 0){
      setmatch(response.data.response.rows)
  }}

  useEffect(() => {
    tourId && dispatch(GetToursLimit({id: tourId}))
    {userData && fetchteams()}
    {tours && fetchmatchs()}
  }, [tourId])

  let today = new Date().toISOString()
  useEffect(() => {
    (today < tours[0]?.begin) ? setapply(true) : setapply(false)
    const fetchteam = async () => {
      const response = await apiGetTeamJoinTour({tourid: tourId, state: 1})
      if (response?.data.err === 0){
        setteams(response.data.response.rows)
      }}
    fetchteam()
  
  }, [])

  return (
    <div className='bg-gray-300 justify-start w-full'>
      <div className="flex object-cover relative flex-col items-center self-stretch px-16 pt-11 w-full aspect-[2.54]">
        <img
            srcSet="https://cdn.ketnoibongda.vn/media-c/1140-402-100/upload/images/bg-default.jpg"
            className="object-cover absolute inset-0 size-full"
            />
      </div>
      <div>
        <h1 className='text-3xl px-2 font-medium py-4 border-b border-gray-200'>Thông tin giải đấu: <span class="text-danger"><b>{tours[0]?.name}</b></span></h1>
        <div class="flex">
          <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Ngày bắt đầu: <span class="text-danger"><b>{tours[0]?.begin.slice(0, 10)}</b></span></div>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Ngày kết thúc: <span class="text-danger"><b>{tours[0]?.end.slice(0, 10)}</b></span></div>
          </div>
          <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Số đội tham dự tối đa: <span class="text-danger"><b>{tours[0]?.maxteam}</b></span></div>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Địa điểm thi đấu: <span class="text-danger"><b>{tours[0]?.tlocation.name}</b></span></div>
          </div>
          <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Thể thức thi đấu: <span class="text-danger"><b>{type[tours[0]?.type]}</b></span></div>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Số vòng đấu: <span class="text-danger"><b>{tours[0]?.turn}</b></span></div>
          </div>
          <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Số hiệp 1 trận: <span class="text-danger"><b>{tours[0]?.round}</b></span></div>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Thời gian 1 hiệp: <span class="text-danger"><b>{tours[0]?.roundtime} <small>phút</small></b></span></div>

          </div>
          <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Số cầu thủ tối đa: <span class="text-danger"><b>{tours[0]?.players}</b></span></div>
            <div class="col-xs-12 col-sm-6 item-infor text-center"> Đại diện BTC: <span class="text-danger"><b>{tours[0]?.staffdetail?.firstName}</b> <b>{tours[0].staffdetail?.lastName}</b></span></div>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-3xl font-medium py-4 px-2 border-b border-gray-200'>Các đội bóng tham gia: <span class="text-danger"></span></h1>
        <table className='w-full bg-white'>
            <thead>
                <tr className='border text-center p-2'>
                    <th className='border text-center p-2'>ID</th>
                    <th className='border text-center p-2'>Tên đội bóng</th>
                    <th className='border text-center p-2'>Huấn luyện viên</th>
                    <th className='border text-center p-2'>Email</th>
                </tr>
            </thead>
            <tbody>
                {!teams.length 
                    ? <tr>
                        <td>Chưa có đội bóng nào tham gia.</td>
                    </tr>
                    : teams?.map(item => {
                        return(
                            <tr className='h-[50px]' key={item.id}>
                                <td className='border text-center p-2'>{item?.team.id}</td>
                                <td className='border text-center p-2'>{item?.team.name}</td>
                                <td className='border text-center p-2'>{item?.team.coach}</td>
                                <td className='border text-center p-2'>{item?.team.email}</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
      </div>

      <div className='flex items-center justify-center'>
        {apply && <Button bgColor='bg-second' text='Đăng ký tham gia' onClick={() => setreg(true)}/>}
      </div>

      {!apply && <div>
        <h1 className='text-3xl font-medium py-4 px-2 border-b border-gray-200'>Các trận bóng gần đây: <span class="text-danger"></span></h1>
        <table className='w-full bg-white'>
            <thead>
                <tr className='border text-center p-2'>
                    <th className='border text-center p-2'>Trận</th>
                    <th className='border text-center p-2'>Thời gian</th>
                    <th className='border text-center p-2'>Tỉ số</th>
                    <th className='border text-center p-2'>Thẻ vàng</th>
                    <th className='border text-center p-2'>Thẻ đỏ</th>
                </tr>
            </thead>
            <tbody>
                {!match.length 
                    ? <tr>
                        <td>Chưa có trận đấu nào diễn ra.</td>
                    </tr>
                    : match?.map(item => {
                        return(
                            <tr className='h-[50px]' key={item.id}>
                                <td className='border text-center p-2'>{item?.TeamA.name} vs {item?.TeamB.name}</td>
                                <td className='border text-center p-2'>{item?.date.slice(0,10)}  {item?.begin} - {item?.end}</td>
                                <td className='border text-center p-2'>{item?.goalA} - {item?.goalB}</td>
                                <td className='border text-center p-2'>{item?.yellowA} - {item?.yellowB}</td>
                                <td className='border text-center p-2'>{item?.redA} - {item?.redB}</td>
                                
                            </tr>
                        )
                    })}
            </tbody>
        </table>
      </div>}
      {reg && <JoinTour tourid={tours[0].id} team={team} setreg={setreg}/> }
    </div>
  )
}

export default DetailTour