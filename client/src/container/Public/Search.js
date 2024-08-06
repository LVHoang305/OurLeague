import React, {useEffect, useState} from 'react'
import { Selectbox } from '../../components'
import {List} from './index'
import { createSearchParams ,useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import Modal from '../../components/Modal'
import { apiGetLocation } from '../../services/location'
import { GetToursLimit } from '../../store/actions/tour'
import { useDispatch } from 'react-redux'

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const [isShowModal, setisShowModal] = useState(false)
  const [content, setcontent] = useState([])
  const [name1, setname1] = useState('')
  const [locations, setlocations] = useState([])
  const [queries, setqueries] = useState({})
  const [texts, settexts] = useState('')
  const [name, setname] = useState('')
  useEffect(() => {
    const fetchLocations = async () => {
      const response = await apiGetLocation()
      if (response?.data.err === 0){
        setlocations(response.data.response)
      }}
    fetchLocations()
  }, [])
  useEffect(() => {
    setqueries(prev => ({...prev,name}))
  }, [name])

  useEffect(() => {
    let paramss = []
    for (let entry of params.entries()){
      paramss.push(entry)
    }
    let searchParamsObject = {}
    paramss?.map(i => {searchParamsObject = {...searchParamsObject, [i[0]]:i[1] }})
    dispatch(GetToursLimit(searchParamsObject))
  }, [params])

  const handlesubmit = (e, location, name) => {
    {e && e.stopPropagation()}
    setisShowModal(false)
    {isShowModal&& setqueries(prev => ({...prev,location}))}
    {name && settexts(name)}
    
  }
  
  const handleSearch= () => {
    
    dispatch(GetToursLimit(queries))
    navigate({
      pathname: location?.pathname,
      search: createSearchParams(queries).toString()
  });
  }
  const input = (e) => {
    setname(e.target.value)  
  }
  
  const handleShowModal = (content, name) => {
    setisShowModal(true)
    setcontent(content)
    setname1(name)
  }

  return (
    <div className='gap-3'>
        <div className='py-2 bg-transparent'>     
        </div>
        <div className='w-1100 p-[10px] flex-col lg:flex-row bg-second rounded-lg flex items-center justify-around gap-2'>
            <span onClick={() => handleShowModal(locations, 'locations')} className='cursor-pointer'><Selectbox text = {!(texts==='')? texts : 'Địa điểm'}/></span>
            <span 
              className='w-3/5 p-[7px] flex-col lg:flex-row rounded-lg flex items-center justify-around'
            >
              <input className='w-full p-[7px] rounded-lg' type='text' id='search' name='search' defaultValue={'Tìm kiếm'} onChange={(e) => input(e)}></input>
            </span>
            <button onClick={handleSearch} type='button' className='outline-none w-1/7 px-4 py-2 bg-third text-md flex item-center justify-center rounded-md text-white '>
                Tìm kiếm
            </button>
        </div>
        {isShowModal && <Modal handlesubmit={handlesubmit} content= {content} setisShowModal={setisShowModal} name={name1} />}
        <List/>
    </div>
  )
  }

export default Search