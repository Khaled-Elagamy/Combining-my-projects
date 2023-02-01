import express from 'express'
import routes from './routes/index'
import logger from './utilities/logger'
import path from 'path'
import multer from 'multer'

const app = express()
const port = 3000

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './landing-page/images')
  },
  filename(req, file, cb) {
    const { originalname } = file
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0]
    cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`)
  }
})
const upload = multer({ storage })
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
  return req.file?.filename
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
      '<center><b><h2>Nothing to show here let me help you to get to the main page<br><a href="javascript:window.location.replace(`/`);"> Main page</a>'
    )
})
app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`)
})

export default app
