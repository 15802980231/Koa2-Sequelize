import type { Context } from 'koa';
import { AddRoleForm } from '../config/joiSchema';
import RoleService from '../service/role';
import type { Role } from '../typings/role';

interface DeleteRole {
  roleCode: string | string[];
}

export default class RoleController {
  /**
   * 添加角色
   * @param {Context} ctx
   * @memberof RoleController
   */
  public static async addRole(ctx: Context) {
    const err = new Error();
    // 获取body同时校验数据合法性
    const roleInfo = await AddRoleForm.validateAsync(ctx.request.body as Role.AddRole);
    // const roleInfo = ctx.request.body as Role.AddRole;

    const res = await RoleService.addRole(roleInfo);
    if (!res) {
      (err as any).status = 403;
      err.message = '新增角色失败';
      throw err;
    }
    // 成功
    ctx.result = null;
  }

  /**
   * 删除角色
   * @param {Context} ctx
   * @memberof RoleController
   */

  public static async deleteRole(ctx: Context) {
    const { roleCode } = ctx.request.body as DeleteRole;
    const res = await RoleService.deleteRole(roleCode);
    if (!res) {
      throw new Error('删除失败');
    }
    ctx.result = res;
  }

  /** 修改角色基础信息
   * @param {Context} ctx
   * @memberof RoleController
   */
  public static async updateRoleInfo(ctx: Context) {
    const roleInfo = await AddRoleForm.validateAsync(ctx.request.body);
    const res = await RoleService.updateRoleInfo(roleInfo);
    if (res) {
      ctx.result = null;
      return;
    }
    ctx.result = roleInfo;
  }

  /** 为角色分配所属菜单菜单
   *  @param {Context} ctx
   */
  // public static async assignMenuPermissions(ctx: Context) {
  //   const request = ctx.request.body as MenuRoleAssociation.UpdateRelevance;
  // }
}
