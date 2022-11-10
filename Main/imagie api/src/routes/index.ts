import express from 'express'
import image from './api/image'
import reset from './api/reset'

const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send(
    '<center><b><h2>Nothing to show here let me help you to get to the main page<br><a href="javascript:window.location.replace(`/`);"> Main page</a>'
  )
})

routes.use('/reset', reset)
routes.use('/image', image)

export default routes
