import express from 'express'
import * as homeController from '../controllers/homepage'

const router = express.Router()

router.get('/tour', homeController.countTours)
router.get('/team', homeController.countTeams)
router.get('/player', homeController.countPlayer)
router.get('/match', homeController.countmatch)

export default router