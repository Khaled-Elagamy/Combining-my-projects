import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
import authMiddleware from '../../middleware/authentication'

const routes = Router()

routes.route('/').post(controllers.create)
routes
  .route('/:id')
  .get(authMiddleware, controllers.getOne)
  .patch(authMiddleware, controllers.updateOne)
  .delete(authMiddleware, controllers.deleteOne)

//authenticate
routes.route('/authenticate').post(controllers.authenticate)
routes.route('/getusers').get(authMiddleware, controllers.getMany)

export default routes
