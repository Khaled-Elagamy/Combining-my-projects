import db from '../database'
import User from '../types/user.type'

class LogoutModel {
  //get refershToken
  async checkFoundToken(refreshtoken: Text): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id,user_name FROM users WHERE refreshtoken=($1)'
      const result = await connection.query(sql, [refreshtoken])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not find user with this refreshToken, ${
          (error as Error).message
        }`
      )
    }
  }
  //Delete refreshToken
  async logout(refreshtoken: Text) {
    try {
      const connection = await db.connect()
      const sql = "UPDATE users SET refreshtoken= '' WHERE refreshtoken=($1)"
      await connection.query(sql, [refreshtoken])
      connection.release()
    } catch (error) {
      throw new Error(
        `Could not delete the refreshToken, ${(error as Error).message}`
      )
    }
  }
}
export default LogoutModel
