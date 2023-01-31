import { Sequelize } from 'sequelize';
import mysqlConfig from './mysqlBase';
// 参数依次为：要导入的数据库名，账号，密码
const sequelize = new Sequelize(mysqlConfig.mysqlName, mysqlConfig.mysqlUserName, mysqlConfig.mysqlPassword, {
  host: mysqlConfig.mysqlIp,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

export default sequelize;
