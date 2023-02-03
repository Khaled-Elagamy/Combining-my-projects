import { Router } from 'express'
import refreshTokenGenerator from '../../controllers/refreshToken.controller'

const routes = Router()

routes.get('/', refreshTokenGenerator)

export default routes
