import type { Context } from 'koa';
import MD5 from 'md5';
import UserService from '../service/user';
import type { User } from '../typings/user';
import Rsa from '../utils/rsa';
import Jwt from '../utils/jwt';
import { AllocationRoleFrom, UserRegisterForm } from '../config/joiSchema';
import UserRoleService from '../service/associationTable';
import type { AssociationTable } from '../typings/associationTable';
import model from '../model';
import RoleService from '../service/role';

export default class UserController {
  /**
   * 添加用户
   * @param {Context} ctx
   * @memberof UserController
   */
  public static async addUser(ctx: Context) {
    const err = new Error();
    const request = ctx.request.body as User.Form;
    request.password = Rsa.rsaDecode(request.password, request.guid);
    // 表单验证
    await UserRegisterForm.validateAsync(request);
    // 存入数据库前进行md5加密
    request.password = MD5(request.password);

    const result = await UserService.addUser(request);
    if (result) {
      ctx.msg = '注册成功';
      ctx.result = null;
    } else {
      err.message = '账号已被注册';
      throw err;
    }
  }

  /**
   *  删除用户
   * @param {Context} ctx
   */
  public static async deleteUser(ctx: Context) {
    const request = (ctx.request.body as any).account as string;
    const result = await UserService.deleteUser(request);
    if (result) {
      ctx.msg = '删除成功';
      ctx.result = null;
    } else {
      throw new Error('删除失败');
    }
  }

  /**
   * 获取用户信息
   */
  public static async getUserInfo(ctx: Context) {
    const account = Jwt.verifyUserToken(ctx.header.authorization)?.account;
    ctx.result = await UserService.queryUserInfo(account!);
  }

  /** 给用户分配角色
   * @param {Context} ctx
   */
  public static async allocationRole(ctx: Context) {
    const err = new Error();
    const request = await AllocationRoleFrom.validateAsync(ctx.request.body);
    const userId = await UserService.queryUserId(request.account);
    const roleIdList = await RoleService.queryRoleId(request.roleList);

    const insertParams: AssociationTable.UpdateParams = {
      field_A: {
        id: userId!,
        field: 'user_id'
      },
      field_B: {
        id: roleIdList!,
        field: 'role_id'
      }
    };
    const res = await UserRoleService.allocationRole(model.userRole, insertParams);
    if (res === false) {
      err.message = '更新失败';
      (err as any).status = 403;
      throw err;
    }

    ctx.result = null;
  }
}
