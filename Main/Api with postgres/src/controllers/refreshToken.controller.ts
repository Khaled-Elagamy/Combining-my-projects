import jwt from 'jsonwebtoken'
import config from '../config'
import { Request, Response } from 'express'
import refreshTokenModel from '../models/refresh-token.model'

const tokenModel = new refreshTokenModel()

const refreshTokenGenerator = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.Token) return res.sendStatus(401)
  const refreshToken = cookies.Token
  res.clearCookie('Token', { httpOnly: true, sameSite: 'none', secure: true })
  const founduser = await tokenModel.getRefreshToken(refreshToken)
  //Detected refreshToken reuse
  if (!founduser) {
    jwt.verify(
      refreshToken,
      config.refreshTokenSecret as unknown as string,
      async (error: any, decoded: any) => {
        if (error) return res.sendStatus(403)
        const hackedUser = await tokenModel.updateHackedUser(decoded.username)
        console.log(hackedUser)
      }
    )
    return res.sendStatus(403)
  }

  //evaluate jwt
  jwt.verify(
    refreshToken,
    config.refreshTokenSecret as unknown as string,
    async (error: any, decoded: any) => {
      if (error) {
        //Delete the old refresh Token from DB if expired
        const remove = await tokenModel.removeInvalidToken(refreshToken)
        console.log('here is error')
      }
      if (error || founduser.user_name !== decoded.username)
        return res.status(403).json({ data: 'error 33' })

      //Delete the old refresh Token from DB
      const remove = await tokenModel.removeInvalidToken(refreshToken)
      console.log('removed with no eror')
      //refresh token is valid
      const newRefreshToken = await tokenModel.newRefreshToken(decoded.username)
      //Create new cookie
      const accessToken = jwt.sign(
        { username: decoded.username },
        config.tokenSecret as unknown as string,
        { expiresIn: '30s' }
      )
      res.cookie('Token', newRefreshToken.refreshtoken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      res.json({ accessToken })
    }
  )
}

export default refreshTokenGenerator
