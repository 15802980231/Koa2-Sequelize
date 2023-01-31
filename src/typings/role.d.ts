/** 角色模块 */
export declare namespace Role {
  interface AddRole {
    /** 角色编码 */
    roleCode: string;
    /** 角色名称 */
    roleName: string;
    /** 角色描述 */
    desc: string;
  }
  /** 数据库表类型 */
  interface DataBaseRole extends AddRole {
    /** 主键 */
    id?: number;
    /** 创建时间 */
    createTime: Date;
    /** 删除时间 */
    deleteTime?: Date | null;
    /** 角色状态 */
    status: 0 | 1;
  }
}
