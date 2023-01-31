import Joi from 'joi';
import type { Role } from '../typings/role';
import type { User } from '../typings/user';

/** 用户注册表验证 */
export const UserRegisterForm = Joi.object<User.Form>({
  guid: Joi.string().required(),
  account: Joi.string().alphanum().min(1).max(10).required(),
  password: Joi.string()
    .pattern(
      /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/
    )
    .required(),
  userName: Joi.string().required(),
  avatar: Joi.string().required(),
  phone: Joi.string().pattern(
    /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/
  ),
  email: Joi.string().email().required(),
  remark: Joi.string()
});

/** 用户分配角色表单 */
export const AllocationRoleFrom = Joi.object<User.AllocationRole>({
  account: Joi.string().alphanum().min(1).max(10).required(),
  roleList: Joi.array()
});

/** 角色添加表单验证 */
export const AddRoleForm = Joi.object<Role.AddRole>({
  roleCode: Joi.string().alphanum().min(1).max(10).required(),
  roleName: Joi.string().required(),
  desc: Joi.string()
});
