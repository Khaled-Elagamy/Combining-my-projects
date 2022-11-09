'use strict'
const __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const path_1 = __importDefault(require('path'))
const fs_1 = require('fs')
const reset = express_1.default.Router()
// Directory path
const dir = path_1.default.resolve('./') + '/images/Thumbnail'
//Return button
const main = '<a href="http://localhost:3000"> Main page</a>'
reset.get('/', (req, res) => {
  res.sendFile(path_1.default.resolve('./') + '/landing-page/reset.html')
}),
  //To get the response
  reset.get('/ok', (req, res) => {
    if (req.query.response === 'ok') {
      ;(0, fs_1.access)('images/Thumbnail', fs_1.constants.F_OK, err => {
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
          ;(0, fs_1.rmSync)(dir, { recursive: true, force: true })
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
exports.default = reset
