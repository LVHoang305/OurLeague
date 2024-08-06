import React from 'react'
import { Link} from 'react-router-dom'
import {formatVietnamesetoString} from '../ultils/Common/formatVietnamesetoString'

const TourButton = ({name, image}) => {
  return (
    <div className='shadow-md rounded-bl-md rounded-br-md'>
        <img src= {image} alt={name} className='w-[190px] h-[110px] object-cover rouned-tl-md rounded-tr-md'/>
        <div className='font-medium p-2 text-blue-700 text-center'>{name}</div>
    </div>
  )
}
//GIẢI BÓNG ĐÁ TRANH CÚP CÔNG ĐOÀN ABCXYZ 2024
const ConvertDate = str => {
  try {
    const [date,time] = str.split("T");
    str = date
    const [year,month,day] = str.split("-");
    str = `${day}-${month}-${year}`
  } catch (error) {
  }
  
  return str;
};
const Tour = ({name,begin,end,teams, id, location}) => {
  let time =''
  var datetime = new Date();
  //console.log(datetime.toISOString())
  if (begin!=''){
    if (end!=''){
      time= 'Từ '+ConvertDate(begin)+' đến '+ConvertDate(end) 
    }
  }
  if (name===undefined) {name='GIẢI BÓNG ĐÁ TRANH CÚP CÔNG ĐOÀN ABCXYZ 2024'}
  if (time==='Từ undefined đến undefined') {time='Từ 22-02-2024 đến 22-02-2024'}
  if (teams===undefined) {teams='8 đội'} else {teams=teams+' đội'}
  if (location ===undefined) {location="Quận Tây Hồ"}
  return (
    <div className="flex flex-col items-center pt-2 bg-white rounded w-[267px] max-w-[267px]">
      <div className="flex object-cover relative flex-col items-center self-stretch px-16 pt-11 w-full aspect-[2.54]">
        <img
            srcSet="https://cdn.ketnoibongda.vn/media-c/1140-402-100/upload/images/bg-default.jpg"
            className="object-cover absolute inset-0 size-full"
            />
            <img
            srcSet="https://cdn.ketnoibongda.vn/upload/images/league-default.png"
            className="z-10 -mb-12 max-w-full border-4 aspect-square w-[110px] cursor-pointer"
            />
      </div>
      <Link to={`giai-dau/${formatVietnamesetoString(name)}/${id}`} className="mt-20 max-w-[267px] h-[56px] text-lg justify-center font-medium leading-7 text-center capitalize text-zinc-800 cursor-pointer">
        {name}
      </Link>
      <div className="mt-4 text-sm leading-5 text-center text-neutral-600">
        {time} 
      </div>
      <div className="mt-4 text-sm leading-5 text-center text-neutral-600">
        {location}
      </div>
      <div className="flex gap-0 self-end mt-20 w-full font-bold text-md leading-10 text-center text-white">
        <div className="flex-1 justify-center items-start px-5 py-3.5 bg-yellow-500">
          {teams}
        </div>
        <Link to={`/giai-dau/${formatVietnamesetoString(name)}/${id}`} className="flex-1 justify-center px-5 py-3.5 bg-red-700 cursor-pointer">
          Thông tin
        </Link>
      </div>
    </div>
  );
}



//export default TourButton
export default Tour