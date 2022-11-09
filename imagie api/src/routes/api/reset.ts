import express from 'express'
import path from 'path'
import { rmSync, access, constants } from 'fs'

const reset = express.Router()
// Directory path
const dir = path.resolve('./') + '/images/Thumbnail'
//Return button
const main = '<a href="http://localhost:3000"> Main page</a>'

reset.get('/', (req, res) => {
  res.sendFile(path.resolve('./') + '/landing-page/reset.html')
}),
  //To get the response
  reset.get('/ok', (req: express.Request, res: express.Response): void => {
    if (req.query.response === 'ok') {
      access('images/Thumbnail', constants.F_OK, err => {
        console.log('\n> Checking if the thumbnail directory exists')
        if (err) {
          console.error('Directory is not found')
          return res
            .status(200)
            .send(
              `<h1><center>Directory is not found!<br>Maybe it's already deleted<br>${main}</center>`
            )
        } else {
          // Delete Thumnail directory
          rmSync(dir, { recursive: true, force: true })
          console.log(`\n${dir} is deleted!`)
          return res
            .status(200)
            .send(
              `<h1><center>The file Thumbnail has been deleted!<br>${main}</center>`
            )
        }
      })
    }
  })

export default reset
