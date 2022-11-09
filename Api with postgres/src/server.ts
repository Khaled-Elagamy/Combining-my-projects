import express, { Request, Response, Application } from 'express'
import logger from './middleware/logger'
import helmet from 'helmet'
import errorMiddleware from './middleware/error'
import limiter from './middleware/Raterlimit'
import routes from './routes'
import config from './config'
import db from './database'
import path from 'path'

const app: Application = express()
const port = config.port || 3000

//Parser middleware
app.use(express.json())
//Security middleware
app.use(helmet())
//Logger middleware
//Rate limiter middleware
app.use(limiter)
//Error handler middleware
app.use(errorMiddleware)
//Routes
app.use('/api', logger, routes)

app.get('/', logger, function (req: Request, res: Response) {
  res.sendFile(path.resolve('./') + '/landing-page/index.html')
})
app.use(express.static('landing-page'))
app.get('/api', logger, function (req: Request, res: Response) {
  res.sendFile(path.resolve('./') + '/register-page/reg.html')
})
app.use(express.static('register-page'))

db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err.stack)
    })
})
app.post('/formdata-as-json', (request, response) => {
  //Destructure the request body
  let resData = {
    serverData: request.body,
  }

  //Console log the response data (for debugging)
  console.log(resData)
  //Send the response as JSON with status code 200 (success)
  response.status(200).json(resData)
})

app.use((_req: Request, res: Response) => {
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
