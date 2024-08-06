import express from 'express'
import * as tourController from '../controllers/tour'
import verifyToken from '../middleware/verifyToken'

const router = express.Router()

router.get('/all', tourController.getTours)
router.get('/limit', tourController.getToursLimit)
router.get('/upcoming', tourController.getToursupcoming)
router.get('/ended', tourController.getToursended)
router.get('/ongoing', tourController.getToursongoing)
router.get('/getteam', tourController.getteamjointour)

router.use(verifyToken)
router.post('/team-join-tour', tourController.teamjointour)
router.put('/update-join-tour', tourController.updatejointour)
router.post('/create-new', tourController.createNewTour)
router.get('/limit-admin', tourController.getToursLimitAdmin)
router.put('/update', tourController.updateTour)
router.delete('/delete', tourController.deleteTour)

export default router
