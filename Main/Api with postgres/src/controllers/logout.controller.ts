import { Request, Response } from 'express'
import LogoutModel from '../models/logout.model'

const logoutModel = new LogoutModel()

const handleLogout = async (req: Request, res: Response) => {
  //On client, also delete the accessToken
  const cookies = req.cookies
  if (!cookies?.Token) return res.status(200).redirect('/Login') //No content
  const refreshToken = cookies.Token
  //Is refreshToken in DB?
  const founduser = await logoutModel.checkFoundToken(refreshToken)
  if (!founduser) {
    res.clearCookie('Token', { httpOnly: true, sameSite: 'none', secure: true })
    return res.sendStatus(403)
  }
  //Delete refreshToken in db
  await logoutModel.logout(refreshToken)

  res.clearCookie('Token', { httpOnly: true, sameSite: 'none', secure: true })
  res.status(200).redirect('/Login')
}
export default handleLogout
