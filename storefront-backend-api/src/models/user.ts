// Node imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Own imports
import Client from "../database";
import config from "../config";

/**
 * User model type
 */
export type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

/**
 * Session model type
 */
export type Session = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  jwt: string;
};

const SQL_SELECT_USERS = "SELECT id, email, firstName, lastName FROM users";
const SQL_SELECT_USER = "SELECT * FROM users WHERE id=($1)";
const SQL_SELECT_USER_BY_MAIL = "SELECT * FROM users WHERE email=($1)";
const SQL_UPDATE_USER =
  "UPDATE users SET email=($2), firstname=($3), lastname=($4), password=($5) WHERE id=($1) RETURNING *";
const SQL_INSERT_USER =
  "INSERT INTO users(email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *";
const SQL_DELETE_USER = "DELETE FROM users WHERE id=($1) RETURNING *";

/**
 * Class to work with User model
 */
export class UserStore {
  async index(): Promise<User[]> {
    const conn = await Client.connect();
    const results = await conn.query(SQL_SELECT_USERS);
    conn.release();
    return results.rows;
  }

  async show(id: number): Promise<User> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_SELECT_USER, [id]);
    conn.release();
    return result.rows[0];
  }

  async update(user: User): Promise<User> {
    const conn = await Client.connect();
    const password_hash = bcrypt.hashSync(
      user.password + config.BCRYPT_PASSWORD,
      parseInt(config.SALT_ROUNDS as string)
    );
    user.password = password_hash;
    const result = await conn.query(SQL_UPDATE_USER, [
      user.id,
      user.email,
      user.firstname,
      user.lastname,
      user.password,
    ]);
    conn.release();
    return result.rows[0];
  }

  async create(user: User): Promise<User> {
    const conn = await Client.connect();
    const password_hash = bcrypt.hashSync(
      user.password + config.BCRYPT_PASSWORD,
      parseInt(config.SALT_ROUNDS as string)
    );
    user.password = password_hash;
    const result = await conn.query(SQL_INSERT_USER, [
      user.email,
      user.firstname,
      user.lastname,
      user.password,
    ]);
    conn.release();
    return result.rows[0];
  }

  async authenticate(email: string, password: string): Promise<Session> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_SELECT_USER_BY_MAIL, [email]);
    const user: User = result.rows[0];
    if (bcrypt.compareSync(password + config.BCRYPT_PASSWORD, user.password)) {
      const token = jwt.sign(user, config.TOKEN_SECRET as jwt.Secret);
      return {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        jwt: token,
      };
    }
    throw Error("Wrong authentication");
  }

  async delete(id: number): Promise<User> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_DELETE_USER, [id]);
    conn.release();
    return result.rows[0];
  }
}
