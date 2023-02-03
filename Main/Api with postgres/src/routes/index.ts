import { Router } from 'express'
import image from './api/image.routes'
import reset from './api/reset.routes'
import usersRoutes from './api/users.routes'
import productRoutes from './api/products.routes'
import orderRoutes from './api/order.routes'
import refreshRoute from './api/refresh.routes'
import logoutRoute from './api/logout.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/products', productRoutes)
routes.use('/orders', orderRoutes)
routes.use('/api/reset', reset)
routes.use('/api/image', image)
routes.use('/refresh', refreshRoute)
routes.use('/logout', logoutRoute)

export default routes
