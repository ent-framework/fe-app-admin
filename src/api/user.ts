import { UserParams, UserModel, UserListGetResultModel } from '../model/user-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

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

export const deleteUser = (data: UserModel) => {
  return defHttp.post<void>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/delete`,
    data,
  });
};
