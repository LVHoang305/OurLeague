import express from 'express'
import * as LocationController from '../controllers/location'

const router = express.Router()

router.get('/all', LocationController.getLocations)

export default router
