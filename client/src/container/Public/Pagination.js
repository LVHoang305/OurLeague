import React, {useEffect, useState} from 'react'
import PageNumber from '../../components/PageNumber'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Pagination = () => {
    const {count, tours} = useSelector(state => state.tour)
    const [arrayPage, setarrayPage] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        let page = searchParams.get('page')
        page && +page !== currentPage && setcurrentPage(+page)
        !page && setcurrentPage(1)
    }, [searchParams])

    useEffect(() => {
        let maxPage = Math.ceil(count/ (+process.env.REACT_APP_LIMIT_TOURS) )
        let end = (currentPage+3) > maxPage ? maxPage : (currentPage+3)
        let start = (currentPage-3) > 0 ? (currentPage-3) : 1   
        let temp = [] 
        for (let i =start;i<=end;i++)
            temp.push(i)
        setarrayPage(temp)
    }, [count, tours, currentPage])

    return (
    <div className='flex items-center justify-center gap-2 py-5'>
        {(currentPage-4)>0 && <PageNumber text='<<' setcurrentPage={setcurrentPage} number={1}/>}
        {(currentPage-4)>0 && <PageNumber text='...'/>}
        {arrayPage?.length > 0 && arrayPage.map(item =>{
            return(
                <PageNumber
                    key={item}
                    number={item}
                    setcurrentPage={setcurrentPage}
                    currentPage={currentPage}
                />
            )
        })}
        {(currentPage+3)<Math.ceil(count/(+process.env.REACT_APP_LIMIT_TOURS)) &&<PageNumber text='...' setcurrentPage={setcurrentPage}/>}
        {(currentPage+3)<Math.ceil(count/(+process.env.REACT_APP_LIMIT_TOURS)) && <PageNumber text='>>' setcurrentPage={setcurrentPage} number={Math.ceil(count/ tours.length)}/>}
    </div>
  )
}

export default Pagination