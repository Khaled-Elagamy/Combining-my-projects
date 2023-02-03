import db from '../database'
import User from '../types/user.type'
import config from '../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//hash password
const hash = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}
class UserModel {
  //create new user
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password)
      values ($1, $2, $3, $4, $5) RETURNING id, email, user_name, first_name, last_name`
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hash(u.password),
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Unable to create user ${u.user_name}, ${(error as Error).message}`
      )
    }
  }
  //get all users
  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql =
        'SELECT id, email, user_name, first_name, last_name FROM users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`)
    }
  }
  //get specific user
  async getOne(id: number): Promise<User> {
    try {
      const connection = await db.connect()
      const sql =
        'SELECT id, email, user_name, first_name, last_name FROM users WHERE id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`)
    }
  }
  //update user
  async updateOne(u: User, id: number): Promise<User> {
    try {
      const connection = await db.connect()
      const sql =
        'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING id, email, user_name, first_name, last_name'
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
        id,
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Coulde not update user: ${u.user_name}, ${error as Error}.message`
      )
    }
  }
  //delete user
  async deleteOne(id: number): Promise<User> {
    //Check user id
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await connection.query(sql, [id])
      const user = result.rows[0]
      if (user == null) {
        throw new Error(`Could not find User ${id} {because user id is wrong}`)
      }
      connection.release()
    } catch (error) {
      throw new Error(`Cant get user${id},${(error as Error).message}`)
    }
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM users 
                   WHERE id=($1) RETURNING id, email, user_name, first_name, last_name`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not delete user ${id}, ${(error as Error).message}`
      )
    }
  }
  //authenticate user
  async authenticate(email: string, password: string) {
    try {
      const connection = await db.connect()
      const sql = 'SELECT password FROM users WHERE email=$1'
      const result = await connection.query(sql, [email])
      if (result.rows.length) {
        const { password: hash } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hash
        )
        if (isPasswordValid) {
          const usernameinfo = await connection.query(
            'SELECT user_name FROM users WHERE email=($1)',
            [email]
          )
          //Saving refreshToken with user in db
          const { user_name: username } = usernameinfo.rows[0]
          const refreshToken = jwt.sign(
            { username },
            config.refreshTokenSecret as unknown as string,
            { expiresIn: '1w' }
          )
          const userInfo = await connection.query(
            'UPDATE users SET refreshtoken=$1 WHERE email=$2 RETURNING  user_name,refreshtoken',
            [refreshToken, email]
          )
          return userInfo.rows[0]
        }
      }

      connection.release()
    } catch (error) {
      throw new Error(`Unable to login:${(error as Error).message}`)
    }
  }
}

export default UserModel
