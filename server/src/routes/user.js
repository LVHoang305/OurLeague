import express from 'express'
import verifyToken from '../middleware/verifyToken'
import * as userController from '../controllers/user'

const router = express.Router()

router.use(verifyToken)
router.get('/get-user', userController.getUsers)
router.get('/get-all-user', userController.getallUsers)
router.put('/update-user', userController.updateUser)
router.delete('/delete', userController.deleteUser)
export default router
