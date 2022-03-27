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
enum Api {
  RolePageList = '/sys-role/page',
  GetAllRoleList = '/sys-role/list',
  setRoleStatus = '/sys-role/update-status',
  RoleCreate = '/sys-role/add',
  RoleUpdate = '/sys-role/update',
  GrantMenu = '/sys-role/grant-menu',
  RoleMenuList = '/sys-role/get-role-menus',
  GrantDataScope = '/sys-role/grant-data-scope',
  GetRoleDataScope = '/sys-role/get-role-data-scope',
  RoleResourceTree = '/sys-role/get-resource-tree',
  RoleSelectedResource = '/sys-role/get-selected-resource',
  GrantRoleResource = '/sys-role/grant-resource',
}

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const updateRoleStatus = (data: RoleParams) =>
  defHttp.post({ url: Api.setRoleStatus, data });

export const saveOrUpdateRole = (data: RoleModel) => {
  if (data.roleId && data.roleId > 0) {
    return defHttp.post<void>({ url: Api.RoleUpdate, data });
  } else {
    return defHttp.post<void>({ url: Api.RoleCreate, data });
  }
};

export const grantMenu = (data: GrantMenuRoleParams) => defHttp.post({ url: Api.GrantMenu, data });

export const grantDataScope = (data: RoleParams) => defHttp.post({ url: Api.GrantDataScope, data });

export const getRoleMenus = (params?: any) =>
  defHttp.get<CheckKeys>({ url: Api.RoleMenuList, params });

export const getRoleDataScopes = (params?: any) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.GetRoleDataScope, params });

export const getRoleResourceTree = (params?: GrantMenuResourceParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RoleResourceTree, params });

export const getRoleSelectedResource = (params?: GrantMenuResourceParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RoleSelectedResource, params });

export const grantRoleResource = (params?: GrantMenuResourceParams) =>
  defHttp.post<void>({ url: Api.GrantRoleResource, params });
