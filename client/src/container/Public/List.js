import {React, useEffect, useRef} from 'react'
import {Tour} from '../../components'
import {Button} from '../../components'
import { GetToursLimit, GetToursUpcoming, GetToursOngoing, GetToursEnded } from '../../store/actions/tour'
import { useDispatch, useSelector} from 'react-redux'
import Pagination from './Pagination'
import { useSearchParams } from 'react-router-dom'

const List = ({number, type}) => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const {tours} = useSelector(state => state.tour)
  const listRef = useRef()

  useEffect(() => {
    let offset = number ? +number : 1
    switch (type) {
      case 'upcoming':
        dispatch(GetToursUpcoming(offset))
        break;
      case 'ongoing':
        dispatch(GetToursOngoing(offset))
        break;
      case 'ended':
        dispatch(GetToursEnded(offset))
        break;

      default:
        dispatch(GetToursLimit(offset))
        break;
    }
    // {!type && dispatch(GetToursLimit(offset))}
    // if (type==='upcoming'){dispatch(GetToursUpcoming(offset))}
    // if (type==='ongoing'){dispatch(GetToursOngoing(offset))}
    // if (type==='ended'){dispatch(GetToursEnded(offset))}
    
    listRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
  }, [number])
  
  return (
    <div ref={listRef} className='w-full p-2'>
        <div className='flex items-center justify-between'>
          <h4 className='text-xl font-semibold text-white'> Danh sách giải đấu</h4>
          {/* <span>Cập nhật: abc</span> */}
        </div>
        
        <div className='flex flex-wrap gap-1'>
          {tours?.length > 0 && tours.map(item =>{
                return (
                  <Tour
                    name={item?.name}
                    begin={item?.begin}
                    end={item?.end}
                    teams={item?.maxteam}
                    id={item?.id}
                    location= {item?.tlocation.name}
                  />
                )})}
        
        </div>
        <Pagination />
        

    </div>
  )
}

export default List
