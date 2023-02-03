import { Router, Request, Response } from 'express'
import path from 'path'
import { existsSync, access, constants, mkdir } from 'fs'
import processing from '../../middleware/processing'

const image = Router()
const main = '<br><a href="http://localhost:3000"> Main page</a>'

image.get('/', (req:Request, res: Response) => {
  return res.send(
    `<h1><center>This page is not developed Yet <br>Come again later :)${main}</center>`
  )
}),
  image.get('/resize', (req, res) => {
    //Definitions
    const name = req.query.name
    const wide = Number(req.query.width as string)
    const tall = Number(req.query.height as string)
    //Paths
    const imgName = path.resolve('./') + `/images/${name}.jpg`
    const imgEdited: string =
      path.resolve('./') + `/images/Thumbnail/${name}-${wide}-${tall}.jpg`
    //If the name wasnt't given
    if (name === undefined) {
      return res
        .status(400)
        .send(`<center><h1> Query parameter name not defined.${main}</center>`)
    }
    //If the image not found
    if (existsSync(imgName) === false) {
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
    if (existsSync(imgEdited) === true) {
      console.log('The image properties are found already')
      return res.status(200).sendFile(imgEdited)
    }
    //To check if the Thumbnail directory is found
    access('images/Thumbnail', constants.F_OK, err => {
      console.log('\n> Checking if the thumbnail directory exists')
      if (err) {
        console.error('File does not exist')
        // Create the file
        console.log('\n> Creating the file')
        mkdir('images/Thumbnail', err => {
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
    processing(req, res)
  })

export default image
