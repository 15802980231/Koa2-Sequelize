import { BIGINT, INTEGER, STRING, TEXT } from 'sequelize';
import sequelize from '../config/sequelizeBase';

const userModel = sequelize.define(
  'sys_user_info',
  {
    id: {
      type: BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    account: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    userName: {
      type: STRING,
      allowNull: false
    },
    avatar: {
      type: STRING
    },
    phone: {
      type: STRING
    },
    email: {
      type: STRING
    },
    remark: {
      type: TEXT
    },
    status: {
      type: INTEGER
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

export default userModel;
