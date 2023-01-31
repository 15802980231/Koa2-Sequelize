/** 用户模块 */
export declare namespace User {
  /** 用户信息表 */
  interface UserInfo {
    guid: string;
    account: string;
    password: string;
    userName: string;
    avatar: string | null;
    phone: number | string | null;
    email: string | null;
    remark: string | null;
    status: 0 | 1;
  }
  /** 注册用户表单 */
  type Form = Omit<UserInfo, 'status'>;

  /** Token 信息 */
  type Token = Omit<UserInfo, 'guid' | 'password' | 'avatar' | 'remark' | 'status'>;

  /** 用户登录 */
  type login = Pick<UserInfo, 'account' | 'password' | 'guid'>;
  /** 修改密码表单 */
  interface ModifyPwd {
    account: string;
    guid: string;
    pwd: string;
    repeatPwd: string;
  }
  /** 修改信息 */
  type ModifyInfo = Omit<UserInfo, 'status' | 'account' | 'password' | 'avatar'>;

  /** 数据库表导出类型 */
  interface DataBase {
    id: number;
    account: string;
    password: string;
    userName: string;
    avatar: string;
    email: string;
    phone: string;
    remark: string;
    status: 0 | 1;
  }

  /** 分配角色表单类型 */
  interface AllocationRole {
    account: string;
    roleList: string[];
  }
}
