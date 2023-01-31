import type { Transaction } from 'sequelize';
import model from '../model';

export default class MenuService {
  /**
   *  menuCode查询菜单Id
   *	@param {string | string[]} menuCode 用户的账号
   */
  public static async queryRoleId(menuCode: string, transaction?: Transaction): Promise<number | null>;
  public static async queryRoleId(menuCode: string[], transaction?: Transaction): Promise<number[] | null>;
  public static async queryRoleId(
    menuCode: string | string[],
    transaction?: Transaction
  ): Promise<number | number[] | null> {
    try {
      if (Array.isArray(menuCode)) {
        const res = await model.menuModel.findAll({
          where: { menuCode, status: 1 },
          transaction,
          attributes: ['id']
        });

        return res.map(it => it.dataValues.id as number);
      }
      const res = await model.menuModel.findOne({ where: { menuCode }, transaction, attributes: ['id'] });
      return res?.dataValues.id as number;
    } catch {
      return null;
    }
  }

  /** 获取所有菜单列表 */
  public static async menuList() {
    try {
      const res = await model.menuModel.findAll();
      return res;
    } catch {
      return null;
    }
  }
}
