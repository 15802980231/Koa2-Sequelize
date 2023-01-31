import { BIGINT, INTEGER, STRING, DATE } from 'sequelize';
import sequelize from '../config/sequelizeBase';

const roleModel = sequelize.define(
  'sys_role_info',
  {
    id: {
      type: BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    roleCode: {
      type: STRING,
      allowNull: false
    },
    roleName: {
      type: STRING,
      allowNull: false
    },
    createTime: {
      type: DATE,
      allowNull: false
    },
    deleteTime: {
      type: DATE
    },
    desc: {
      type: STRING
    },
    status: {
      type: INTEGER,
      allowNull: false
    }
  },
  {
    // 启用时间戳
    // timestamps: true,
    // 启用paranoid 删除
    paranoid: true,
    freezeTableName: true
  }
);

export default roleModel;
