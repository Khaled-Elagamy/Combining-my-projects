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
const processing_1 = __importDefault(require('../../utilities/processing'))
const image = express_1.default.Router()
const main = '<br><a href="http://localhost:3000"> Main page</a>'
image.get('/', (req, res) => {
  return res.send(
    `<h1><center>This page is not developed Yet <br>Come again later :)${main}</center>`
  )
}),
  image.get('/resize', (req, res) => {
    //Definitions
    const name = req.query.name
    const wide = Number(req.query.width)
    const tall = Number(req.query.height)
    //Paths
    const imgName = path_1.default.resolve('./') + `/images/${name}.jpg`
    const imgEdited =
      path_1.default.resolve('./') +
      `/images/Thumbnail/${name}-${wide}-${tall}.jpg`
    //If the name wasnt't given
    if (name === undefined) {
      return res
        .status(400)
        .send(`<center><h1> Query parameter name not defined.${main}</center>`)
    }
    //If the image not found
    if ((0, fs_1.existsSync)(imgName) === false) {
      return res
        .status(400)
        .send(
          `<center><h1> This image not found <h3>  Add it first<h1> ${main}</center>`
        )
    }
    //If the width or hieght is missing
    if (isNaN(wide) || wide <= 0 || isNaN(tall) || tall <= 0) {
      return res
        .status(400)
        .send(
          `<center><h1> Query parameter width or height is not well written<br>Must be a Number and greater than 0.${main}</center>`
        )
    }
    //If the same image with the same properties is found
    if ((0, fs_1.existsSync)(imgEdited) === true) {
      console.log('The image properties are found already')
      return res.status(200).sendFile(imgEdited)
    }
    //To check if the Thumbnail directory is found
    ;(0, fs_1.access)('images/Thumbnail', fs_1.constants.F_OK, err => {
      console.log('\n> Checking if the thumbnail directory exists')
      if (err) {
        console.error('File does not exist')
        // Create the file
        console.log('\n> Creating the file')
        ;(0, fs_1.mkdir)('images/Thumbnail', err => {
          if (err) {
            return console.error(err)
          }
          console.log('Thumbnail directory created successfully!')
        })
      } else {
        console.log('Directory found')
      }
    })
    //To edit the image and call it
    ;(0, processing_1.default)(req, res)
  })
exports.default = image
