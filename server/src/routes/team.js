import express from 'express'
import * as teamController from '../controllers/team'
import verifyToken from '../middleware/verifyToken'

const router = express.Router()

router.get('/all', teamController.getTeams)
router.get('/players', teamController.getplayers)
router.get('limit-by-admin',teamController.getTeamLimitbyAdmin)

router.use(verifyToken)
router.post('/create-new', teamController.createNewTeam)
router.get('/limit-admin', teamController.getTeamLimitAdmin)
router.put('/update', teamController.updateteam)
router.delete('/delete', teamController.deleteteam)


router.post('/create-new-player', teamController.createNewPlayer)
router.put('/update-player', teamController.updateplayer)
router.delete('/delete-player', teamController.deleteplayer)

export default router