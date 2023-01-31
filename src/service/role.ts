import type { Transaction } from 'sequelize';
import { Op } from 'sequelize';
import sequelize from '../config/sequelizeBase';
import model from '../model';
import type { Role } from '../typings/role';
import { ServiceUtils } from '../utils/service';
import UserService from './user';

export default class RoleService {
  /**
   *  userCode查询角色Id
   *	@param {string | string[]} roleCode 用户的账号
   */
  public static async queryRoleId(roleCode: string, transaction?: Transaction): Promise<number | null>;
  public static async queryRoleId(roleCode: string[], transaction?: Transaction): Promise<number[] | null>;
  public static async queryRoleId(
    roleCode: string | string[],
    transaction?: Transaction
  ): Promise<number | number[] | null> {
    try {
      if (Array.isArray(roleCode)) {
        const res = await model.roleModel.findAll({
          where: { roleCode, status: 1 },
          transaction,
          attributes: ['id']
        });

        return res.map(it => it.dataValues.id as number);
      }
      const res = await model.roleModel.findOne({ where: { roleCode }, transaction, attributes: ['id'] });
      return res?.dataValues.id as number;
    } catch {
      return null;
    }
  }

  /**
   *  查询用户拥有的角色
   * 	@param {string} userId 用户id
   */
  public static async queryUserOwnRole(account: string) {
    try {
      const userInfo = await UserService.queryUserTable(account);

      if (!userInfo) {
        return null;
      }
      const result = await model.userModel.findOne({
        include: [{ model: model.roleModel, attributes: ['roleCode', 'roleName'] }],
        where: { id: userInfo.id },
        attributes: []
      });
      return result;
    } catch {
      return null;
    }
  }

  /** 查询角色在数据库中的状态
   * 	0	没有注册的角色
   * 	1 被删除的角色
   * 	2 正常角色
   *  @param {string} roleCode 角色编码
   */
  public static async queryRoleStatus(roleCode: string, transaction?: Transaction) {
    const role = (await model.roleModel.findOne({ where: { roleCode }, transaction }))
      ?.dataValues as Role.DataBaseRole | null;
    if (role?.status === 1) {
      return 2;
    }
    if (role?.status === 0) {
      return 1;
    }
    return 0;
  }

  /** 新增角色
   *	@param {Role.AddRole} role 注册的角色信息
   */
  public static async addRole(roleInfo: Role.AddRole) {
    try {
      return await sequelize.transaction(async transaction => {
        const addData: Role.DataBaseRole = {
          ...roleInfo,
          status: 1,
          deleteTime: null,
          createTime: new Date()
        };
        const res = await ServiceUtils.insertData(
          model.roleModel,
          { field: 'roleCode', data: addData as any },
          transaction
        );
        return res;
      });
    } catch (err) {
      return false;
    }
  }

  /** 删除角色
   *  @param {string} roleCode 角色编码
   */
  public static async deleteRole(roleCode: string | Array<string>) {
    try {
      return await sequelize.transaction(async transaction => {
        // 批量删除
        if (Array.isArray(roleCode)) {
          const condition = roleCode.map(it => ({ roleCode: it }));
          const role = await model.roleModel.findAll({
            where: { [Op.or]: condition },
            transaction
          });

          // 数组中含有已经被删除的角色
          if (!role.every(it => it.dataValues.status === 1)) {
            return false;
          }

          await model.roleModel.update(
            { status: 0, deleteTime: new Date() },
            { where: { [Op.or]: condition }, transaction }
          );
          return true;
        }
        const roleStatus = await this.queryRoleStatus(roleCode, transaction);
        if (roleStatus === 2) {
          await model.roleModel.update({ status: 0, deleteTime: new Date() }, { where: { roleCode }, transaction });
          return true;
        }
        return false;
      });
    } catch {
      return false;
    }
  }

  /** 修改角色基础信息
   *  @param {Role.AddRole} roleInfo 需要修改的角色信息
   */
  public static async updateRoleInfo(roleInfo: Role.AddRole) {
    try {
      return await sequelize.transaction(async transaction => {
        const status = await this.queryRoleStatus(roleInfo.roleCode, transaction);
        // 修改正常角色信息
        if (status === 2) {
          await model.roleModel.update(roleInfo, { where: { roleCode: roleInfo.roleCode } });
          return true;
        }
        return false;
      });
    } catch {
      return false;
    }
  }
}
