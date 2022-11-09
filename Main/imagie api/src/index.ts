import express from 'express'
import routes from './routes/index'
import logger from './utilities/logger'
import path from 'path'

const app = express()
const port = 3000

import { promises } from 'fs'

app.get('/show-images', async (req, res) => {
  try {
    const files = await promises.readdir('./landing-page/images/')
    res.status(200).json(files)
  } catch (err) {
    res.status(500).json(err)
  }
})
app.use('/api', logger, routes)

app.get('/', logger, (req: express.Request, res: express.Response): void => {
  res.sendFile(path.resolve('./') + '/landing-page/index.html')
})
app.use(express.static('landing-page'))

app.use((_req: express.Request, res: express.Response) => {
  res
    .status(404)
    .send(
      '<center><b><h2>Nothing to show here let me help you to get to the main page<br><a href="http://localhost:3000"> Main page</a>'
    )
})
app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`)
})

export default app
