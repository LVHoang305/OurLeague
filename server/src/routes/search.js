import express from 'express'
import * as searchController from '../controllers/search'

const router = express.Router()

router.get('/limit', searchController.getsearchsLimit)

export default router
