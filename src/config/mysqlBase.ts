import { IP } from './constant';

type NodeEnv = {
  /**
   *数据库名
   * @type {string}
   */
  mysqlName: string;
  /**
   *数据库用户名
   * @type {string}
   */
  mysqlUserName: string;
  /**
   *数据库用户密码
   * @type {string}
   */
  mysqlPassword: string;
  /**
   *mysql部署的机器IP
   * @type {string}
   */
  mysqlIp: string;
};

const development: NodeEnv = {
  mysqlName: 'sys_amber_oa',
  mysqlUserName: 'root',
  mysqlPassword: 'a123456',
  mysqlIp: IP
};

const production: NodeEnv = {
  mysqlName: 'xl_admin',
  mysqlUserName: 'mysql',
  mysqlPassword: 'mysqldev',
  mysqlIp: IP
};

export default {
  development,
  production
}[process.env.NODE_ENV || 'development'] ?? development;
