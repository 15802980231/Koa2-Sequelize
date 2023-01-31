import type { Model, ModelCtor, Transaction } from 'sequelize';
import type { Service } from '../typings/common';

export class ServiceUtils {
  /** 根据字段插叙字段
   *	@param {ModelCtor<Model<any, any>>} model 查询数据表的实例模型
   *	@param {Service.SingularParams | Service.MultipleParams} params 查询参数
   * 	@param {Transaction} transaction 事务
   */
  public static queryTableData<T>(
    model: ModelCtor<Model<any, any>>,
    params: Service.SingularParams,
    transaction?: Transaction
  ): Promise<T | null>;

  public static queryTableData<T>(
    model: ModelCtor<Model<any, any>>,
    params: Service.MultipleParams,
    transaction?: Transaction
  ): Promise<Array<T> | null>;

  public static async queryTableData<T>(
    model: ModelCtor<Model<any, any>>,
    params: Service.SingularParams | Service.MultipleParams,
    transaction?: Transaction
  ): Promise<Array<T> | T | null> {
    try {
      if (Array.isArray(params.query)) {
        const res = await model.findAll({
          where: { [params.field]: params.query, status: 1 },
          attributes: params.attribute,
          transaction
        });
        const resList = res.map(it => it.dataValues);
        return resList.length === 0 ? null : resList;
      }

      return (
        await model.findOne({
          where: { [params.field]: params.query, status: 1 },
          attributes: params.attribute,
          transaction
        })
      )?.dataValues;
    } catch {
      return null;
    }
  }

  /** 数据库删除功能(软删除)
   * @param {ModelCtor<Model<any, any>>}model 查询数据表的实例模型
   * @param {Service.SingularDelete | Service.MultipleDelete} params 查询参数
   * @param {Transaction} transaction 事务
   */
  public static async deleteData(
    model: ModelCtor<Model<any, any>>,
    params: Service.SingularDelete | Service.MultipleDelete,
    transaction?: Transaction
  ): Promise<boolean> {
    try {
      // 如果数据每一项有异常立即抛出错误
      if (Array.isArray(params.query)) {
        const fitler = await this.queryTableData(model, { field: params.field, query: params.query }, transaction);
        if (
          !fitler ||
          !fitler.map((it: any) => it[params.field]).every(it => (params.query as Array<string | number>).includes(it))
        ) {
          return false;
        }
      }
      const fitler = await this.queryTableData(
        model,
        { field: params.field, query: params.query as string | number },
        transaction
      );
      if (!fitler) {
        return false;
      }

      const condition = params.deleteTimeField ? { status: 0, [params.deleteTimeField]: new Date() } : { status: 0 };
      await model.update(condition, { where: { [params.field]: params.query, transaction } });
      return true;
    } catch {
      return false;
    }
  }

  /** 数据库插入功能(插入新行或者修改status字段为1)
   *	@param {ModelCtor<Model<any, any>>}model 查询数据表的实例模型
   *	@param {Service.Insert}insert 插入数据
   *  @param {Transaction} transaction 事务
   */
  public static async insertData(model: ModelCtor<Model<any, any>>, insert: Service.Insert, transaction: Transaction) {
    try {
      const data = Array.isArray(insert.data) ? insert.data : [insert.data];

      // 插入字段进行唯一性判断
      let only = true;
      try {
        const arr = data.map(it => it[insert.field] as string);
        arr.forEach(item => {
          if (!(arr.indexOf(item) === arr.lastIndexOf(item) && arr.indexOf(item) !== -1)) {
            throw new Error();
          }
        });
      } catch {
        only = false;
      }
      if (!only) {
        return only;
      }
      // 验证插入的所有数据是否合法
      const query = await this.queryTableData(
        model,
        { field: insert.field, query: data.map(it => it[insert.field]) },
        transaction
      );

      // 插入数据中有正常数据
      if (query && query.length !== 0) {
        return false;
      }

      // 过滤需要修改状态或者新增数据
      const filter = (
        await model.findAll({
          where: { [insert.field]: data.map(it => it[insert.field]), status: 0 },
          transaction
        })
      ).map(it => it.dataValues[insert.field] as string);

      const updateArr: any[] = [];
      const insetArr: any[] = [];
      data.forEach(it => {
        if (filter.includes(it[insert.field])) {
          const obj = { ...it, status: 1 };
          updateArr.push(obj);
        }
        insetArr.push(it);
      });

      updateArr.forEach(async it => {
        await model.update(it, { where: { [insert.field]: it[insert.field] }, transaction });
      });

      await model.bulkCreate(insetArr, { transaction });
      return true;
    } catch (err) {
      return false;
    }
  }

  /** 修改数据(单条修改和批量修改)
   *	@param {ModelCtor<Model<any, any>>}model 查询数据表的实例模型
   *	@param {Service.Insert}insert 插入数据
   *  @param {Transaction} transaction 事务
   */
  public static async updateData() {
    //
  }
}
