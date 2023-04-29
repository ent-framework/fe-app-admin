import {
  UserParams,
  UserModel,
  UserListGetResultModel,
  UserGrantRoleModel,
} from '../model/user-model';
import { defHttp } from 'fe-ent-core/lib/utils';

export const getUserPage = (params: UserParams) =>
  defHttp.get<UserListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/page`,
    params,
  });

export const updateUserStatus = (data: UserModel) =>
  defHttp.post({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/update-status`,
    data,
  });

export const saveOrUpdateUser = (data: UserModel) => {
  if (data.userId && data.userId > 0) {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/update`,
      data,
    });
  } else {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/add`,
      data,
    });
  }
};

export const deleteUser = (data: any) => {
  return defHttp.post<void>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/delete`,
    data,
  });
};

export const grantRole = (params?: UserGrantRoleModel) =>
  defHttp.post<void>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/grant-role`,
    params,
  });

export const getUserRoles = (params?: UserModel): Recordable =>
  defHttp.get<void>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/get-user-roles`,
    params,
  });
