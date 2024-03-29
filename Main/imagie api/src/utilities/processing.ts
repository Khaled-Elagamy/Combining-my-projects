import express from 'express'
import sharp from 'sharp'
import path from 'path'

const processing = (req: express.Request, res: express.Response): void => {
  const name = (req.query.imgname as string).replace(/\.[^\/.]+$/, ''),
    wide = Number(req.query.width as string),
    tall = Number(req.query.height as string)
  //Paths
  const imgName: string =
    path.resolve('./') + `/landing-page/images/${name}.jpg`
  const imgEdited: string =
    path.resolve('./') +
    `/landing-page/images/Thumbnail/${name}-${wide}-${tall}.jpg`
  ;(async function() {
    try {
      await sharp(imgName)
        .resize({
          width: Number(wide),
          height: Number(tall),
          fit: 'cover'
        })
        .toFile(imgEdited)
      return res.sendFile(imgEdited)
    } catch (error) {
      console.log(error)
    }
  })()
}

export default processing
