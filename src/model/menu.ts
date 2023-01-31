import { BIGINT, STRING } from 'sequelize';
import sequelize from '../config/sequelizeBase';

const menuModel = sequelize.define(
  'sys_menu_info',
  {
    id: {
      type: BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    menuCode: {
      type: STRING,
      allowNull: false
    },
    menuName: {
      type: STRING,
      allowNull: false
    },
    remark: {
      type: STRING
    }
  },
  {
    paranoid: true,
    freezeTableName: true
  }
);

export default menuModel;
