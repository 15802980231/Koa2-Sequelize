import { DataTypes, DATE } from 'sequelize';
import sequelize from '../config/sequelizeBase';
import roleModel from './role';
import userModel from './user';

// 多对多关联表
const userRole = sequelize.define(
  'sys_user_role',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: userModel,
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

userModel.belongsToMany(roleModel, { through: userRole, foreignKey: 'user_id', otherKey: 'role_id' });
roleModel.belongsToMany(userModel, { through: userRole, foreignKey: 'role_id', otherKey: 'user_id' });

export default userRole;
