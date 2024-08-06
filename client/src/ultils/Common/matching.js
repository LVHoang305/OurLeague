export const cv = (a) => {
    const [t1,t2] = a.split(':')
    num = +t1 + (+t2)/60
    return +num
  }

export const func = (obj1,obj2) => {
  if (!(cv(obj1?.start) < cv(obj2?.end)) || !(cv(obj2?.start) < cv(obj1?.end)))
    console.log('Not this')
  else {
    if ((cv(obj1.start)>cv(obj2.start)) && (cv(obj1.end)>cv(obj2.end))){
      if ((cv(obj2.end) - cv(obj1.start)) >= 1){
        console.log(`Từ ${obj1.start} đến ${obj2.end}`)
        check.push(obj2)
      }  
    }
    if ((cv(obj1.start)>cv(obj2.start)) && (cv(obj2.end)>cv(obj1.end))){
      if ((cv(obj1.end) - cv(obj1.start)) >= 1){
        console.log(`Từ ${obj1.start} đến ${obj1.end}`)
        check.push(obj2)
      }  
    }
    if ((cv(obj2.start)>cv(obj1.start)) && (cv(obj1.end)>cv(obj2.end))){
      if ((cv(obj2.end) - cv(obj2.start)) >= 1){
        console.log(`Từ ${obj2.start} đến ${obj2.end}`)
        check.push(obj2)
      }  
    }
    if ((cv(obj2.start)>cv(obj1.start)) && (cv(obj2.end)>cv(obj1.end))){
      if ((cv(obj1.end) - cv(obj2.start)) >= 1){
        console.log(`Từ ${obj2.start} đến ${obj1.end} `)
        check.push(obj2)
      }  
    }

  }
}

export const func3 = (obj1,obj2) => {
  setfinal(obj2[0])

  for (let i = 0; i < obj2.length; i++) {
    console.log(i)
    if ((-5 < (obj1.rate - obj2[i].rate)) && (-5 < (obj1.rate - obj2[i].rate))) {
      setfinal(obj2[i])
      break 
    }
  } 
}

export const func2 = (obj1,obj2,check) => {
  for (let i = 0; i < obj2.length; i++) {
    func(obj1,obj2[i])
  }
  func3(obj1,check) 
}