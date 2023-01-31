import type { Context } from 'koa';
import md5 from 'md5';
import UserService from '../service/user';
import type { Auth } from '../typings/auth';
import type { User } from '../typings/user';
import Rsa from '../utils/rsa';
import Jwt from '../utils/jwt';

export default class AuthController {
  /**
   * 获取公钥和guid
   * @param {Context} ctx
   */
  public static async fetchGeneratekey(ctx: Context) {
    try {
      ctx.result = Rsa.generatekey();
    } catch {
      throw new Error('');
    }
  }

  /**
   * 密码加密(测试接口)
   * 	@param {Context} ctx
   */
  public static encrypt(ctx: Context) {
    console.log(Rsa.privateKey);

    const request = ctx.request.body as Auth.RsaEncrypt;
    ctx.result = Rsa.rsaEncryption(request.password, request.publicKey);
  }

  /** 用户登录 */
  public static async login(ctx: Context) {
    const err = new Error();

    // 账号密码登录流程
    const request = ctx.request.body as User.login;
    if (request.account && request.password && request.guid) {
      const userInfo = await UserService.queryUserTable(request.account);
      if (!userInfo) {
        err.message = '账号不存在';
        (err as any).code = 403;
        throw err;
      }
      // 密码解密后进行比对
      let pwd = await Rsa.rsaDecode(request.password, request.guid);
      pwd = md5(pwd);
      if (pwd !== userInfo!.password) {
        err.message = '密码错误';
        (err as any).code = 403;
        throw err;
      }
      const tokenParams: User.Token = {
        account: userInfo!.account,
        userName: userInfo!.userName,
        phone: userInfo!.phone,
        email: userInfo!.email
      };
      ctx.msg = '登陆成功';
      ctx.result = Jwt.signUserToken(tokenParams);
      return;
    }

    // token登录流程
    /** token解析信息 */
    const userInfo = Jwt.verifyUserToken(ctx.header.authorization);
    // 解析token
    if (userInfo) {
      const { account, userName, phone, email } = userInfo as User.Token;
      // 验证账号是否正常
      const status = await UserService.isRegister(account);
      if (status !== 0) {
        // 账号异常处理
        err.message = '账号不存在';
        (err as any).code = 403;
        throw err;
      }
      ctx.msg = '登陆成功';
      // 重新颁发新token
      ctx.result = Jwt.signUserToken({ account, userName, phone, email });
      return;
    }
    (err as any).status = 401;
    throw err;
  }
}
