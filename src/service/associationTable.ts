import type { Model, ModelCtor, Transaction } from 'sequelize';
import { Op } from 'sequelize';
import type { AssociationTable } from '../typings/associationTable';

export default class AssociationTableService {
  /** 查询对应关系
   * 	@param {ModelCtor<Model<any, any>>} model 中间表模型
   *  @param {number} id 用户账号
   *  @param {string} queryField 查询字段
   *  @return {Array<number>}	查询到关联id
   */
  public static async queryAssociationList<T>(dataModel: ModelCtor<Model<any, any>>, id: number, queryField: string) {
    try {
      const res = await dataModel.findAll({ where: { [queryField]: id } });
      const assTable = res.map(it => it.dataValues) as Array<T>;
      return assTable;
    } catch {
      return null;
    }
  }

  /** 为用户分配角色
   * 	@param {ModelCtor<Model<any, any>>} model 中间表模型
   * 	@param {string} account 用户的账号
   *  @param {Array<string>} roleList 关联角色表
   */
  public static async allocationRole(
    dataModel: ModelCtor<Model<any, any>>,
    params: AssociationTable.UpdateParams,
    transaction?: Transaction
  ) {
    try {
      // 查询原有关系
      const hasRelation = (
        await dataModel.findAll({
          where: { [params.field_A.field]: params.field_A.id },
          attributes: [params.field_B.field],
          transaction
        })
      ).map(it => it.dataValues.role_id) as number[];

      /** 需要新增关系 */
      const newRelation: any[] = [];

      // 过滤新增关系
      params.field_B.id.forEach(it => {
        if (!hasRelation.includes(it)) {
          newRelation.push({
            [params.field_A.field]: params.field_A.id,
            [params.field_B.field]: it,
            update_at: new Date()
          });
        }
      });

      /** 需要删除关系 */
      const deleteRelation: any[] = [];
      hasRelation.forEach(it => {
        if (!params.field_B.id.includes(it)) {
          deleteRelation.push({ [params.field_B.field]: it, [params.field_A.field]: [params.field_A.id] });
        }
      });

      // 删除操作
      await dataModel.destroy({
        where: { [Op.or]: deleteRelation },
        transaction
      });
      // 添加操作
      await dataModel.bulkCreate(newRelation as any, { transaction });
      return true;
    } catch (err) {
      return false;
    }
  }
}
