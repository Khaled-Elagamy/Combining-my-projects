import express, { Request, Response, Application } from 'express'
import logger from './middleware/logger'
import helmet, { crossOriginOpenerPolicy } from 'helmet'
import errorMiddleware from './middleware/error'
import limiter from './middleware/Raterlimit'
import routes from './routes'
import config from './config'
import db from './database'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app: Application = express()
const port = config.port || 3000

//Parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Security middleware
//remove helmet for secuity reasons
//app.use(helmet())
//Logger middleware
//Rate limiter middleware
app.use(limiter)
//Error handler middleware
app.use(errorMiddleware)
//Cookies middleware
app.use(cookieParser())
//remove cors for secuity reasons
/*
app.use(cors())
app.use(
  cors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Origin-Agent-Cluster',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    credentials: true,
  })
)
*/
app.use(function (req, res, next) {
  if (req.url.slice(-1) === '/' && req.url.length > 1) {
    res.redirect(301, req.url.slice(0, -1))
  } else {
    next()
  }
})
//Routes
app.use('/app', logger, routes)
//Main page
app.get('/', function (req: Request, res: Response) {
  res.redirect('/Home')
})
app.get('/Home', logger, async (req: Request, res: Response) => {
  res.sendFile(path.resolve('./') + '/landing-page/index.html')
})
app.use(
  express.static('landing-page', {
    maxAge: '1h',
    setHeaders: function (res) {
      res.set('Cache-Control', 'public, max-age=3600')
      res.set('Expires', new Date(Date.now() + 3600 * 1000).toUTCString())
    },
  })
)
//Register and login page
app.get('/Login', logger, function (req: Request, res: Response) {
  res.sendFile(path.resolve('./') + '/register-page/reg.html')
})
app.use(
  express.static('register-page', {
    maxAge: '1h',
    setHeaders: function (res) {
      res.set('Cache-Control', 'public, max-age=3600')
      res.set('Expires', new Date(Date.now() + 3600 * 1000).toUTCString())
    },
  })
)

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

app.all('*', (_req: Request, res: Response) => {
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
