import { Router } from 'express'
import handleLogout from '../../controllers/logout.controller'

const routes = Router()

routes.get('/', handleLogout)

export default routes
