import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const registerService = ({username, password, phone}) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: {username},
            defaults: {
                username,
                password: hashPassword(password),
                phone
            }
            
        })

        const token = response[1] && jwt.sign({password: response[0].password, username: response[0].username}, process.env.SECRET_KEY, {expiresIn: '2d'})
        resolve({
            err: token ? 0 :2,
            mas: token ? 'Dang ky thanh cong': 'Tai khoan da ton tai',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})

export const loginService = ({username, password}) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: {username},
            raw: true
            
        })
        const isCorrectPassword = response && (bcrypt.compareSync(password, response.password)||(password= response.password))
        const token = isCorrectPassword && jwt.sign({username: response.username,password: response.password}, process.env.SECRET_KEY, {expiresIn: '2d'})
        resolve({
            err: token ? 0 :2,
            mas: token ? 'Dang nhap thanh cong': response ? 'Thong tin sai':'Dang nhap that bai',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})