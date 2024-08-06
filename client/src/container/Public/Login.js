import React, {useEffect, useState} from 'react'
import { InputForm, Button } from '../../components'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoggedin, msg, update} = useSelector(state => state.auth)
    const [isRegister, setisRegister] = useState(location.state?.flag)
    const [invalidFields, setinvalidFields] = useState([])
    const [payload, setPayload] = useState({
        username: '',
        password: '',
        phone: ''
    })

    useEffect (() => {
        setisRegister(location.state?.flag)
    },[location.state?.flag])
    useEffect (() => {
        isLoggedin && navigate('/')
    }, [isLoggedin])
    useEffect (() => {
        msg && Swal.fire('Oops !',msg, 'error')
    }, [msg, update])

    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            username: payload.username,
            password: payload.password
        }
        let invalids = validate(finalPayload)
        if (invalids === 0) {
            isRegister ? dispatch(actions.register(finalPayload)) : dispatch(actions.login(finalPayload))
        }
    }
    const validate = (payload) => {
        let invalids = 0
        let fields = Object.entries(payload)
        fields.forEach(item => {
            if (item[1] === '') {
                setinvalidFields(prev => [...prev, {
                name: item[0],
                message: 'Không được để trống trường này.'
            }])
            invalids++
        }})
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setinvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu cần nhiều hơn 6 ký tự.'
                    }])
                    invalids++
                    }
                    break;
                case 'phone':
                    if (!+item[1]){
                        setinvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không hợp lệ.'
                    }])
                    invalids++
                    }
                    break;
            
                default:
                    break;
            }
        })
        return invalids
    }

    return (
        <div className='bg-white mt-[30px] w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'> 
            <h3 className='font-semibold text-2xl mb-3'>{isRegister ? 'Đăng ký': 'Đăng Nhập'}</h3>
            <div className='w-full flex flex-col gap-3'>
                <InputForm 
                    setinvalidFields={setinvalidFields} 
                    invalidFields={invalidFields} 
                    label={"Tài khoản"} 
                    value= {payload.username} 
                    setValue={setPayload} 
                    keyPayload={'username'}
                />
                <InputForm 
                    setinvalidFields={setinvalidFields} 
                    invalidFields={invalidFields} 
                    label={"Mật khẩu"} 
                    value= {payload.password} 
                    setValue={setPayload} 
                    keyPayload={'password'}
                    type={'password'}
                />
                {isRegister && <InputForm 
                    setinvalidFields={setinvalidFields} 
                    invalidFields={invalidFields} 
                    label={"Số điện thoại"} 
                    value={payload.phone} 
                    setValue={setPayload} 
                    keyPayload={'phone'}
                />}
            
                <Button
                    text={isRegister ? 'Đăng ký': 'Đăng Nhập'}
                    bgColor='bg-third'
                    textColor="text-white"
                    fullWidth
                    onClick={handleSubmit}
                />
            </div>
            <div className='mt-7 flex item-center justify-between'>
                {isRegister?
                <small>Bạn đã có tài khoản? <span 
                onClick={() => {
                    setisRegister(false)
                    setPayload({
                        username: '',
                        password: '',
                        phone: ''
                    })
                }}
                className='text-blue-500 hover:underline hover:text-[red] cursor-pointer'
                >Đăng nhập ngay
                </span></small>
                : <>
                <small className='text-[blue] hover:text-[red] cursor-pointer'>Quên mật khẩu?</small>
                <small className='text-[blue]'>Bạn chưa có tài khoản? <span 
                onClick={() => {setisRegister(true)}}
                className='text-blue-500 hover:underline hover:text-[red] cursor-pointer'
                >Đăng ký
                </span></small>
                </>}
            </div>
        </div>
    )
}

export default Login
