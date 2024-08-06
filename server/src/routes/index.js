import authRouter from './auth'
import tourRouter from './tour'
import locationRouter from './location'
import searchRouter from './search'
import userRouter from './user'
import teamRouter from './team'
import matchRouter from './match'
import homeRouter from './homepage'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/tour', tourRouter)
    app.use('/api/v1/location', locationRouter)
    app.use('/api/v1/search', searchRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/team', teamRouter)
    app.use('/api/v1/match', matchRouter)
    app.use('/api/v1/home', homeRouter)

    return app.use('/',(reg,res)=> {
        res.send('Server on')
    })
}

export default initRoutes