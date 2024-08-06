import express from 'express'
import * as matchController from '../controllers/match'

const router = express.Router()

router.post('/create', matchController.createMatch)
router.get('/get', matchController.getMatch)
router.put('/update', matchController.updateMatch)
router.delete('/delete', matchController.deleteMatch)
router.post('/create-matching', matchController.createMatching)
router.get('/get-matching', matchController.getMatching)
router.put('/update-matching', matchController.updateMatching)

export default router