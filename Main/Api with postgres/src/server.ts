import express, { Request, Response, Application } from 'express'
import logger from './middleware/logger'
import helmet from 'helmet'
import errorMiddleware from './middleware/error'
import limiter from './middleware/Raterlimit'
import routes from './routes'
import config from './config'
import db from './database'
import path from 'path'
import cookieParser from 'cookie-parser'

const app: Application = express()
const port = config.port || 3000

//Parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Security middleware
app.use(helmet())
//Logger middleware
//Rate limiter middleware
app.use(limiter)
//Error handler middleware
app.use(errorMiddleware)
//Cookies middleware
app.use(cookieParser())
//Routes
app.use('/app', logger, routes)
//Main page
app.get('/Home', logger, function (req: Request, res: Response) {
  res.sendFile(path.resolve('./') + '/landing-page/index.html')
})
app.get('/', function (req: Request, res: Response) {
  res.redirect('/Home')
})
app.use(express.static('landing-page'))
//Register and login page
app.get('/Login', logger, function (req: Request, res: Response) {
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
