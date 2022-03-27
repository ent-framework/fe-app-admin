import { UserParams, UserModel, UserListGetResultModel } from '../model/user-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  UserPage = '/sys-user/page',
  UpdateStatus = '/sys-user/update-status',
  UserList = '/sys-user/page',
  UserCreate = '/sys-user/add',
  UserUpdate = '/sys-user/update',
  UserDelete = '/sys-user/delete',
}

export const getUserPage = (params: UserParams) =>
  defHttp.get<UserListGetResultModel>({ url: Api.UserPage, params });

export const updateUserStatus = (data: UserModel) => defHttp.post({ url: Api.UpdateStatus, data });

export const saveOrUpdateUser = (data: UserModel) => {
  if (data.userId && data.userId > 0) {
    return defHttp.post<void>({ url: Api.UserUpdate, data });
  } else {
    return defHttp.post<void>({ url: Api.UserCreate, data });
  }
};

export const deleteUser = (data: UserModel) => {
  return defHttp.post<void>({ url: Api.UserDelete, data });
};
