import { UserParams, UserListGetResultModel } from '../model/user-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  UserPageList = '/sys-user/page',
  IsUserExist = '/api/UserExist',
  DeptList = '/api/getDeptList',
  setRoleStatus = '/api/setRoleStatus',
  MenuList = '/api/getMenuList',
  RolePageList = '/api/getRoleListByPage',
  GetAllRoleList = '/api/getAllRoleList',
}

export const getUserList = (params: UserParams) =>
  defHttp.get<UserListGetResultModel>({ url: Api.UserPageList, params });
