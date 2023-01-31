import jsonwebtoken from 'jsonwebtoken';
import { expiresIn, JwtSecret } from '../config/constant';
import type { User } from '../typings/user';

export default class Jwt {
  /**
   * 生成用户token
   * @static
   * @param {UserParams} userData
   * @param {*} [options]
   * @return {*}  {string}
   * @memberof JwtAuth
   */
  public static signUserToken(userData: User.Token): string | null {
    try {
      return jsonwebtoken.sign(userData, JwtSecret, { expiresIn });
    } catch (error) {
      return null;
    }
  }

  /**
   * 验证用户token值
   * @static
   * @param {string} token
   * @return {*}  {Object}
   * @memberof JwtAuth
   */
  public static verifyUserToken(token: string | undefined): User.Token | null {
    if (!token) {
      return null;
    }
    const authorization = token.split(' ')[token.split(' ').length - 1];
    try {
      return jsonwebtoken.verify(authorization, JwtSecret) as User.Token;
    } catch {
      return null;
    }
  }
}
