import {
  RoleParams,
  RolePageParams,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  RoleModel,
  GrantMenuRoleParams,
  GrantMenuResourceParams,
} from '../model/role-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';
import { CheckKeys } from 'fe-ent-core/lib/components/tree';

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/page`,
    params,
  });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/list`,
    params,
  });

export const updateRoleStatus = (data: RoleParams) =>
  defHttp.post({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/update-status`,
    data,
  });

export const saveOrUpdateRole = (data: RoleModel) => {
  if (data.roleId && data.roleId > 0) {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/update`,
      data,
    });
  } else {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/add`,
      data,
    });
  }
};

export const grantMenu = (data: GrantMenuRoleParams) =>
  defHttp.post({ url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/grant-menu`, data });

export const grantDataScope = (data: RoleParams) =>
  defHttp.post({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/grant-data-scope`,
    data,
  });

export const getRoleMenus = (params?: any) =>
  defHttp.get<CheckKeys>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/get-role-menus`,
    params,
  });

export const getRoleDataScopes = (params?: any) =>
  defHttp.get<RolePageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/get-role-data-scope`,
    params,
  });

export const getRoleResourceTree = (params?: GrantMenuResourceParams) =>
  defHttp.get<RolePageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/get-resource-tree`,
    params,
  });

export const getRoleSelectedResource = (params?: GrantMenuResourceParams) =>
  defHttp.get<RolePageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/get-selected-resource`,
    params,
  });

export const grantRoleResource = (params?: GrantMenuResourceParams) =>
  defHttp.post<void>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-role/grant-resource`,
    params,
  });
