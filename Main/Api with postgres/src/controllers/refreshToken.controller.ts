import jwt from 'jsonwebtoken'
import config from '../config'
import { Request, Response } from 'express'
import refreshTokenModel from '../models/refresh-token.model'

const tokenModel = new refreshTokenModel()

const refreshTokenGenerator = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.Token) return res.sendStatus(401)
  const refreshToken = cookies.Token
  const founduser = await tokenModel.getRefreshToken(refreshToken)
  if (!founduser) return res.sendStatus(403)

  jwt.verify(
    refreshToken,
    config.refreshTokenSecret as unknown as string,
    (error: any, decoded: any) => {
      if (error || founduser.user_name !== decoded.username)
        return res.sendStatus(403)
      const accessToken = jwt.sign(
        { username: decoded.username },
        config.tokenSecret as unknown as string,
        { expiresIn: '30s' }
      )
      res.json({ accessToken })
    }
  )
}

export default refreshTokenGenerator
