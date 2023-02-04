import db from '../database'
import User from '../types/user.type'
import jwt from 'jsonwebtoken'
import config from '../config'

class refreshTokenModel {
  async getRefreshToken(refreshtoken: string): Promise<User> {
    try {
      //get refreshtoken
      const connection = await db.connect()
      const sql = 'SELECT user_name FROM users WHERE $1 = ANY(refreshtoken)'
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

  async updateHackedUser(user_name: string) {
    try {
      //Empty all refresh tokens
      const connection = await db.connect()
      const sql = `UPDATE users SET refreshtoken = '{}' WHERE user_name=$1 RETURNING  user_name,refreshtoken`
      const result = await connection.query(sql, [user_name])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not find user ${user_name}, ${(error as Error).message}`
      )
    }
  }
  async removeInvalidToken(refreshtoken: Text) {
    try {
      //removing refresh token
      const connection = await db.connect()
      const sql =
        'UPDATE users SET refreshtoken = array_remove(refreshtoken, $1) WHERE $1 = ANY(refreshtoken)'
      const result = await connection.query(sql, [refreshtoken])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not find user ${refreshtoken}, ${(error as Error).message}`
      )
    }
  }
  async newRefreshToken(user_name: string) {
    try {
      const newrefreshToken = jwt.sign(
        { username: user_name },
        config.refreshTokenSecret as unknown as string,
        { expiresIn: '1w' }
      )
      //Saving refreshToken with user in db
      const connection = await db.connect()
      const sql =
        'UPDATE users SET refreshtoken = array_append(refreshtoken,$1) WHERE user_name=$2 RETURNING refreshtoken[array_length(refreshtoken, 1)]'

      const result = await connection.query(sql, [newrefreshToken, user_name])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not find user ${user_name}, ${(error as Error).message}`
      )
    }
  }
}

export default refreshTokenModel
