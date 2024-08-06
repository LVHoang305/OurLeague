import jwt from 'jsonwebtoken'

const verifyToken = (req,res, next) => {
    
    let accessToken = req.headers.authorization.split(' ')[1]
    if(!accessToken) return res.status(401).json({
        err: -1,
        msg: 'Missing accessToken'
    })

    jwt.verify(accessToken,process.env.SECRET_KEY, (err,user) => {
        if (err) return res.status(401).json({
            err: 1,
            msg: 'AcessToken het han'
        })

        req.user = user
        next()
    })
}

export default verifyToken