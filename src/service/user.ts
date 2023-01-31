import type { Transaction } from 'sequelize';
import model from '../model';
import sequelize from '../config/sequelizeBase';
import type { User } from '../typings/user';
import type { UserRoleAssociation } from '../typings/associationTable';
import UserRoleService from './associationTable';

export default class UserService {
  /**
   *  账号查询用户ID
   *	@param {string | string[]} account 用户的账号
   */
  public static async queryUserId(account: string, transaction?: Transaction): Promise<number | null>;
  public static async queryUserId(account: string[], transaction?: Transaction): Promise<number[] | null>;
  public static async queryUserId(
    account: string | string[],
    transaction?: Transaction
  ): Promise<number | number[] | null> {
    try {
      if (Array.isArray(account)) {
        const res = await model.userModel.findAll({ where: { account, status: 1 }, transaction, attributes: ['id'] });
        return res.map(it => it.dataValues.id as number);
      }
      const res = await model.userModel.findOne({ where: { account }, transaction, attributes: ['id'] });
      return res?.dataValues.id as number;
    } catch {
      return null;
    }
  }

  /** 查询用户表
   * 	@static
   * 	@param {string} account 用户账号
   * 	@return {Object} 用户的信息
   */
  public static async queryUserTable(account: string, transaction?: Transaction) {
    try {
      const result = await model.userModel.findOne({ where: { account, status: 1 }, transaction });
      return result as User.DataBase | null;
    } catch (error) {
      return null;
    }
  }

  /**
   * 校验用户账号是否已经注册
   *  @static
   * 	@param {string} account
   * 	@return {number} 0.已经被注册的账号
   *	1.被删除的账号
   *	2.没有查询到的账号
   */
  public static async isRegister(account: string, transaction?: Transaction) {
    try {
      const result = await model.userModel.findOne({
        attributes: ['account', 'status'],
        where: { account },
        transaction
      });
      // 1.没有查询到的账号
      if (!result) {
        return 2;
      }
      // 2.被删除的账号
      if (result?.dataValues.status === 0) {
        return 1;
      }
      // 3.已被注册的账号
      return 0;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * 表中插入数据,新增用户数据
   * 	@static
   */
  public static async addUser(user: User.Form) {
    try {
      return await sequelize.transaction(async transaction => {
        const res = await this.isRegister(user.account, transaction);
        if (res === 1) {
          await model.userModel.update(user, { where: { account: user.account }, transaction });
          return true;
        }
        if (res === 2) {
          await model.userModel.create(user, { transaction });
          return true;
        }
        return false;
      });
    } catch (error) {
      return false;
    }
  }

  /**
   *	删除用户
   *	@static
   *	@param {string} account 删除用户的账号
   */
  public static async deleteUser(account: string) {
    try {
      return await sequelize.transaction(async transaction => {
        const res = await this.isRegister(account, transaction);
        if (res === 0) {
          await model.userModel.update({ status: 0 }, { where: { account }, transaction });
          return true;
        }
        return false;
      });
    } catch (error) {
      return false;
    }
  }

  /** 查询用户信息
   * 	@param {string} account 用户的账号
   *  @return {any} 用户信息对象
   */
  public static async queryUserInfo(account: string) {
    try {
      const result = await this.queryUserTable(account);
      if (!result) {
        return null;
      }

      const { id, phone, email, remark, avatar, userName } = (
        await model.userModel.findOne({
          where: { id: result.id }
        })
      )?.dataValues as User.DataBase;

      const roleIdList = await UserRoleService.queryAssociationList<UserRoleAssociation.DataBaseType>(
        model.userRole,
        id,
        'user_id'
      );
      const roleInfo = await model.roleModel.findAll({
        where: {
          id: roleIdList?.map(it => {
            return it.role_id;
          })
        }
      });

      const res = {
        account,
        userName,
        phone,
        email,
        remark,
        avatar,
        role: roleInfo?.map(it => ({ roleCode: it.dataValues.roleCode, roleName: it.dataValues.roleName }))
      };
      return res;
    } catch {
      return null;
    }
  }
}
