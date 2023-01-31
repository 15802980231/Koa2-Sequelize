import { DataTypes, DATE } from 'sequelize';
import sequelize from '../config/sequelizeBase';
import roleModel from './role';
import menuModel from './menu';

// 多对多关联表
const menuRole = sequelize.define(
  'sys_user_role',
  {
    menu_id: {
      type: DataTypes.INTEGER,
      references: {
        model: menuModel,
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: roleModel,
        key: 'id'
      }
    },
    update_at: DATE
  },
  {
    freezeTableName: true
  }
);

menuModel.belongsToMany(roleModel, { through: menuRole, foreignKey: 'menu_id', otherKey: 'role_id' });
roleModel.belongsToMany(menuModel, { through: menuRole, foreignKey: 'role_id', otherKey: 'menu_id' });

export default menuRole;
