import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Modal from '../../components/Modal'
import { Selectbox, Button } from '../../components'
import { apiGetLocation } from '../../services/location'
import { apiGetTeamLimitAdmin} from '../../services/team'
import { apiGetMatch } from '../../services/match'
import { apiGetMatching, apiupdateMatching, apicreateMatching } from '../../services/match'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

export const Guide = () => {
  const {userData} = useSelector(state => state.user)
  const [check1, setcheck1] = useState([])
  const [state1, setstate1] = useState(false)
  const [state2, setstate2] = useState(false)
  const [locations, setlocations] = useState([])
  const [showteams, setshowteams] = useState(false)
  const [locationname, setlocationname] = useState('')
  const [texts, settexts] = useState('')
  const [final, setfinal] = useState({})
  const [teams, setteams] = useState([])
  const [Aside, setAside] = useState([])
  const [Bside, setBside] = useState([])
  const [name, setname] = useState('')
  const [content, setcontent] = useState([])
  const [msg1, setmsg1] = useState('')
  const [msg2, setmsg2] = useState('')
  const [email1, setemail1] = useState('')
  const [email2, setemail2] = useState('')
  const [phone1, setphone1] = useState('')
  const [phone2, setphone2] = useState('')
  const [name1, setname1] = useState('')
  const [name2, setname2] = useState('')
  const [matchings, setmatchings] = useState([])
  const [time, settime] = useState('')
  const [isShowModal, setisShowModal] = useState(false)
  const [queries, setqueries] = useState(() => {
    const initData = {
        team: 0,
        date: new Date(),
        begin: '00:00',
        end: '00:00',
        location: 0,
        rate: 0,
        found: 0

    }
    return initData
})

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await apiGetLocation()
      if (response?.data.err === 0){
        setlocations(response.data.response)
      }}
    fetchLocations()
  }, [])
  
  useEffect(() => {
    setmsg1(`Thời gian: ${time}. Đối thủ: ${name2} - Email: ${email2} - Phone: ${phone2}`)
    setmsg2(`Thời gian: ${time}. Đối thủ: ${name1} - Email: ${email1} - Phone: ${phone1}`)
    setTimeout(() => {
      {state1 && setstate2(true)}
   }, 5000);
    {state1 && setstate1(false)}
  }, [state1])

  useEffect(() => {
    {state2 && sendmail(email1,msg1,name1)}
    // {state2 && sendmail(email2,msg2,name2)}
    const letcreate = async () => {
        const response = await apicreateMatching(queries)
        if (queries.found!=0) {
          const response1 = await apiupdateMatching({id:queries.found,found:queries.id})
        }
        if (response?.data.err ===0){
          Swal.fire('Thành công', 'Chúng tôi sẽ gửi mail cho bạn khi tìm thấy đối thủ phù hợp', 'success').then(()=> {
          })
      } else {
          Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
      }
    }
    {state2 && letcreate()}
    {state2 && setstate2(false)}
  }, [state2])

  useEffect(() => {
    const fetchAside = async () => {
      const response = await apiGetMatch({teamA:queries.team})
      if (response?.data.err === 0){
        setAside(response.data.response)
      }}
    const fetchBside = async () => {
      const response = await apiGetMatch({teamB:queries.team})
      if (response?.data.err === 0){
        setBside(response.data.response)
      }}
    fetchAside()
    fetchBside()
  }, [queries.team])

  useEffect(() => {
    {userData && fetchteams()}
  }, [])
  const fetchteams = async () => {
    const response = await apiGetTeamLimitAdmin({owner:userData.id})
    if (response?.data.err === 0){
      setteams(response.data.response.rows)
    }}
  
  const fetchmatching = async () => {
    const response = await apiGetMatching({location:queries.location, date:queries.date, found:0})
    if (response?.data.err === 0){
      setmatchings(response.data.response.rows)
      setfinal(response.data.response.rows[0])
    }}
  useEffect(() => {
    fetchmatching()
  }, [queries.location,queries.date])

  useEffect(() => {
    let count = +Aside.count + +Bside.count
    let goal = 0
    for (let i = 0; i < Aside.count; i++) {
      goal = goal + Aside.rows[i].goalA
    }
    for (let i = 0; i < Bside.count; i++) {
      goal = goal + Bside.rows[i].goalB
    }
    let rate = goal/count
    setqueries(prev => ({...prev, rate:rate}))

  }, [Aside,Bside])
  

  const handlesubmit = (e, location, name) => {
    {e && e.stopPropagation()}
    setisShowModal(false)
    setqueries(prev => ({...prev, location: location}))
    {name && settexts(name)} 
  }

  const handleShowModal = (content, name) => {
    setisShowModal(true)
    setcontent(content)
    setlocationname(name)
  }
  

  
  const func3 = (obj1,obj2) => {
    setfinal(obj2[0])
    for (let i = 0; i < obj2.length; i++) {
      if ((-5 < (obj1.rate - obj2[i].rate)) && (-5 < (obj1.rate - obj2[i].rate))) {
        setfinal(obj2[i])
        break 
      }
    } 
  }
  
  const func2 = (obj1,obj2) => {
    obj2.map(item => {
    if (!(cv(obj1?.begin) < cv(item?.end)) || !(cv(item?.begin) < cv(obj1?.end)))
      console.log('Not this')
    else {
      if ((cv(obj1.begin)>=cv(item.begin)) && (cv(obj1.end)>=cv(item.end))){
        if ((cv(item.end) - cv(obj1.begin)) >= 1){
          settime(`từ ${obj1.begin} đến ${final.end}`)
          setcheck1([...check1, item])
        }  
      }
      if ((cv(obj1.begin)>=cv(item.begin)) && (cv(item.end)>=cv(obj1.end))){
        if ((cv(obj1.end) - cv(obj1.begin)) >= 1){
          settime(`từ ${obj1.begin} đến ${final.end}`)
          setcheck1([...check1, item])
        }  
      }
      if ((cv(item.begin)>=cv(obj1.begin)) && (cv(obj1.end)>=cv(item.end))){
        if ((cv(item.end) - cv(item.begin)) >= 1){
          settime(`từ ${obj1.begin} đến ${final.end}`)
          setcheck1([...check1, item])
        }  
      }
      if ((cv(item.begin)>=cv(obj1.begin)) && (cv(item.end)>=cv(obj1.end))){
        if ((cv(obj1.end) - cv(item.begin)) >= 1){
          settime(`từ ${obj1.begin} đến ${final.end}`)
          setcheck1([...check1, item])  
        }  
      }
      
    }
    })
    func3(obj1,check1)
    if (!(cv(obj1?.begin) < cv(final?.end)) || !(cv(final?.begin) < cv(obj1?.end)))
      setqueries(prev => ({...prev, found: 0}))
    else {
      if ((cv(obj1.begin)>=cv(final?.begin)) && (cv(obj1.end)>=cv(final?.end))){
        if ((cv(final?.end) - cv(obj1.begin)) >= 1){
          settime(`từ ${obj1.begin} đến ${final?.end}`)
        }  
      }
      if ((cv(obj1.begin)>=cv(final?.begin)) && (cv(final?.end)>=cv(obj1.end))){
        if ((cv(obj1.end) - cv(obj1.begin)) >= 1){
          settime(`từ ${obj1.begin} đến ${obj1.end}`)
        }  
      }
      if ((cv(final?.begin)>=cv(obj1.begin)) && (cv(obj1.end)>=cv(final?.end))){
        if ((cv(final?.end) - cv(final?.begin)) >= 1){
          settime(`từ ${final?.begin} đến ${final?.end}`)
        }  
      }
      if ((cv(final?.begin)>=cv(obj1.begin)) && (cv(final?.end)>=cv(obj1.end))){
        if ((cv(obj1.end) - cv(final?.begin)) >= 1){
          settime(`từ ${final?.begin} đến ${obj1.end} `)
        }  
      }
       
    }
    setname2(final?.DetailTeam?.name ||'')
    setphone2(final?.DetailTeam?.phone ||'')
    setemail2(final?.DetailTeam?.email ||'')
    setqueries(prev => ({...prev, found: final?.id}))
    setstate1(true) 

  }

  const cv = (a) => {
    const [t1,t2] = a.split(':')
    let num = +t1 + (+t2)/60
    return +num
  }

  const sendmail = (email,msg,name) => {
    const serviceId = 'service_qq6996u'
    const templateId = 'template_04a11qa'
    const publicKey = 'qGa27WHebF8c4c2KT'

    const TemplateParams = {
      from_name: 'OurLeague',
      from_email: email,
      to_name: name,
      message:msg
    }

    emailjs.send(serviceId, templateId, TemplateParams, publicKey)
      .then((response) => {
        console.log('Thanh cong ', response)
      })
      .catch((error) => {
        console.error('Loi ', error)
      })
  }

  return (
    <div className='px-6'>
      <h1 className='text-white text-3xl font-medium py-4 border-b border-gray-200'>Tìm đối thủ</h1>
        <div className='py-4 flex flex-col gap-4 flex-auto justify-center'>
          <div className='flex flex-col gap-2'>
            <span className='text-white' >Đội bóng</span>
            <span onClick={() => setshowteams(true)} className='cursor-pointer w-[760px]'><Selectbox text = {!(name==='')? name : 'Đội bóng'}/></span>
          </div>
          <div className='flex justify-start gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white'>Địa điểm</span>
              <span onClick={() => handleShowModal(locations, 'locations')} className='cursor-pointer'><Selectbox text = {!(texts==='')? texts : 'Địa điểm'}/></span>
              {isShowModal && <Modal handlesubmit={handlesubmit} content= {content} setisShowModal={setisShowModal} name={locationname} />}
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white' >Ngày</span>
              <input type='date' onChange={(e) => setqueries(prev => ({...prev, date: e.target.value+'T00:00:00.000Z'}))} className='w-[300px] h-[36px] rounded-md'/>
            </div>
          </div>
          <div className='flex justify-start gap-40'>
            <div className='flex flex-col gap-2'>
              <span className='text-white'>Thời gian bắt đầu</span>
              <input onChange={(e) => setqueries(prev => ({...prev, begin: e.target.value}))} type='time' defaultValue={'00:00'} className='w-[300px] h-[36px] rounded-md'/>  
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white'>Thời gian kết thúc</span>
              <input onChange={(e) => setqueries(prev => ({...prev, end: e.target.value}))} type='time' defaultValue={'00:00'} className='w-[300px] h-[36px] rounded-md'/>               
            </div>
          </div>
        <button className='bg-second w-[760px] h-[40px]' onClick={() => {
          func2(queries,matchings)
        }} type='button' >Tạo đơn</button>
      </div>
      {showteams &&
      <div
      onClick={() =>{setshowteams(false)}} 
      className='fixed top-0 left-0 right-0 bottom-0 z-20 bg-overlay-70 flex justify-center items-center'>
        <div 
          onClick={(e) =>{
            e.stopPropagation()
            setshowteams(true)
          }} 
          className='w-2/3  rounded-md'>
      <div className='h-[680px]'>
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
                    <th className='border text-center p-2'>Chọn</th>
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
                                    <Button text='Chọn' onClick={(e) => {
                                      setname(item.name)
                                      setname1(item.name)
                                      setphone1(item.phone)
                                      setemail1(item.email)
                                      setqueries(prev => ({...prev, team: item.id}))
                                      e.stopPropagation()
                                      setshowteams(false)
                                    }}/>                  
                                </td>

                            </tr>
                        )
                    })}
            </tbody>
          </table>
          </div>
          </div>
          </div>}
    </div>
  )
}

export default Guide
