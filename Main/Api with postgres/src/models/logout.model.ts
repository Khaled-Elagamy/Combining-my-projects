import db from '../database'
import User from '../types/user.type'

class LogoutModel {
  //get refershToken from db
  async checkFoundToken(refreshtoken: Text): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id,user_name FROM users WHERE $1 = ANY(refreshtoken)'
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
  //Delete refreshToken from db
  async logout(refreshtoken: Text) {
    try {
      const connection = await db.connect()
      const sql =
        'UPDATE users SET refreshtoken = array_remove(refreshtoken, $1) WHERE $1 = ANY(refreshtoken)'
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
