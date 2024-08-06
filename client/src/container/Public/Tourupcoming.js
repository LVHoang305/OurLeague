import React, {useEffect, useState} from 'react'
import { Selectbox } from '../../components'
import {List} from './index'
import { createSearchParams ,useNavigate, useSearchParams } from 'react-router-dom'
import Modal from '../../components/Modal'
import { apiGetLocation } from '../../services/location'
import { GetToursLimit, GetToursUpcoming } from '../../store/actions/tour'
import { useDispatch } from 'react-redux'

export const Tourupcoming = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [isShowModal, setisShowModal] = useState(false)
  const [content, setcontent] = useState([])
  const [name, setname] = useState('')
  const [locations, setlocations] = useState([])
  const [queries, setqueries] = useState({})
  const [texts, settexts] = useState('')

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await apiGetLocation()
      if (response?.data.err === 0){
        setlocations(response.data.response)
      }}
    fetchLocations()
  }, [])

  useEffect(() => {
    dispatch(GetToursUpcoming(params.get('page')))
  }, [params])


  const handlesubmit = (e, location, name) => {
    e.stopPropagation()
    setisShowModal(false)
    {isShowModal&& setqueries(prev => ({...prev,location}))}
    settexts(name)
  }
  
  const handleSearch= () => {
    navigate({
      pathname:'/tim-kiem',
      search: createSearchParams(queries).toString()
    })
    dispatch(GetToursLimit(queries))
  }
  const handleShowModal = (content, name) => {
    setisShowModal(true)
    setcontent(content)
    setname(name)
  }
  return (
    <div className='gap-3'>
        <div className='py-2 bg-transparent'>     
        </div>
        <div className='w-1100 p-[10px] flex-col lg:flex-row bg-second rounded-lg flex items-center justify-around gap-2'>
            <span onClick={() => handleShowModal(locations, 'locations')} className='cursor-pointer'><Selectbox text = {!(texts==='')? texts : 'Địa điểm'}/></span>
            <span className='w-3/5 bg-white p-[7px] flex-col lg:flex-row rounded-lg flex items-center justify-around'>Search</span>
            <button onClick={handleSearch} type='button' className='outline-none w-1/7 px-4 py-2 bg-third text-md flex item-center justify-center rounded-md text-white '>
                Tìm kiếm
            </button>
        </div>
        {isShowModal && <Modal handlesubmit={handlesubmit} content= {content} setisShowModal={setisShowModal} name={name} />}
        <List type={'upcoming'}/>
    </div>
  )
  }

export default Tourupcoming