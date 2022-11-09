import { Router } from 'express'
import image from './api/image.routes'
import reset from './api/reset.routes'
import usersRoutes from './api/users.routes'
import productRoutes from './api/products.routes'
import orderRoutes from './api/order.routes'

const routes = Router()

routes.use('/users', usersRoutes,)
routes.use('/products', productRoutes)
routes.use('/orders', orderRoutes)
routes.use('/reset', reset)
routes.use('/image', image)

export default routes
