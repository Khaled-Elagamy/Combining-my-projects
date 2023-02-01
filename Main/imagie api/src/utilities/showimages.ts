import express from 'express'
import { promises } from 'fs'
import path from 'path'

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const files = await promises.readdir('../imagie api/landing-page/images/')
    let jsonstr: string[] = []
    files.forEach(file => {
      if (path.extname(file) == '.jpg' || path.extname(file) == '.png') {
        jsonstr.push(file)
      }
    })
    res.status(200).json(jsonstr)
  } catch (err) {
    res.status(500).json(err)
  }
}
export default show
