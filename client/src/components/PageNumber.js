import React, {memo} from 'react'
import { createSearchParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'

const notActive ='px-5 py-3 bg-white hover:bg-gray-500 rounded-md cursor-pointer'
const Active = 'px-5 py-3 bg-second text-white hover:bg-gray-500 rounded-md cursor-pointer'
const PageNumber = ({text, number, currentPage, setcurrentPage}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    let entries = searchParams.entries()

    const append = (entries) =>{
        // let params = []
        // searchParams.append('page', +number)
        // for (let entry of searchParams.entries()) {
        //     params.push(entry)
        //   }
        // let a = {}
        // params?.map(i => {
        //     a ={...a, [i[0]]: i[1]}
        // })
        // return a
        let params = []
        searchParams.append('page', +number)
        for (let entry of entries) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        return searchParamsObject
    }
    
    const handleChangePage = () =>{
        // if (number!==undefined) setcurrentPage(+number)
        // navigate({
        //     pathname: `/${link}`,
        //     search: createSearchParams({
        //         page: number
        //     }).toString()
        // })
        if (!(number === undefined)) {
            setcurrentPage(number)
            navigate({
                pathname: location?.pathname,
                search: createSearchParams(append(entries)).toString()
            });
        }
    }
    return (
        <div 
            className= {+number===+currentPage ? Active : notActive}
            onClick={handleChangePage}
        >
            {text || number}
        </div>
    )
}

export default memo(PageNumber)