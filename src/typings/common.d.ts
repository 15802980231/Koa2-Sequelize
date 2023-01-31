import type { Optional } from 'sequelize';

export declare namespace Service {
  /** 单条查询 */
  interface SingularQuery {
    /** 查询内容 */
    query: string | number;
    /** 需要查询的唯一字段 */
    field: string;
  }
  /** 多条查询 */
  interface MultipleQuery {
    /** 查询内容 */
    query: Array<string | number>;
    /** 需要查询的唯一字段 */
    field: string;
  }

  /** 查询方法参数类型(单条查询) */
  interface SingularParams extends SingularQuery {
    /** 查询返回的中的对象属性 */
    attribute?: string[];
  }
  /** 查询方法参数类型(多条查询) */
  interface MultipleParams extends MultipleQuery {
    /** 查询返回的中的对象属性 */
    attribute?: string[];
  }
  /** 删除方法参数类型(单条删除) */
  interface SingularDelete extends SingularQuery {
    /** 删除时间的字段 */
    deleteTimeField?: string;
  }
  /** 删除方法参数类型(多条删除) */
  interface MultipleDelete extends MultipleQuery {
    /** 删除时间的字段 */
    deleteTimeField?: string;
  }
  /** 插入方法参数类型 */
  interface Insert {
    /** 插入前查询的字段 */
    field: string;
    /** 插入数据 */
    data: Optional<any, string> | Array<Optional<any, string>>;
  }
}
