import db from '../database'
import User from '../types/user.type'

class refreshTokenModel {
  //get refreshtoken
  async getRefreshToken(refreshtoken: Text): Promise<User> {
    try {
      const connection = await db.connect()
      const sql =
        'SELECT user_name FROM users WHERE refreshtoken=($1)'
      const result = await connection.query(sql, [refreshtoken])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not find user ${refreshtoken}, ${(error as Error).message}`
      )
    }
  }
}
export default refreshTokenModel
