/** 角色用户关联表 */
export declare namespace UserRoleAssociation {
  interface DataBaseType {
    /** 用户ID */
    user_id: number;
    /** 角色ID */
    role_id: number;
    /** 更新时间 */
    update_at?: Date;
  }
}
/** 角色菜单关联表 */
export declare namespace MenuRoleAssociation {
  interface DataBaseType {
    /** 用户ID */
    menu_id: number;
    /** 角色ID */
    role_id: number;
    /** 更新时间 */
    update_at?: Date;
  }
  /** 修改关联表单关系的表单类型 */
  interface UpdateRelevance {
    roleCode: string;
    menuList: string[];
  }
}

/** 关联表类型集合 */
export declare namespace AssociationTable {
  /** 更新关联表参数类型 */
  interface UpdateTable<T> {
    /** id */
    id: T;
    /** 数据库中的字段 */
    field: string;
  }
  /** 更新参数 */
  interface UpdateParams {
    field_A: UpdateTable<number>;
    field_B: UpdateTable<Array<number>>;
  }
}
