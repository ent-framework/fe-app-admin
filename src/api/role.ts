import {
  RoleParams,
  RolePageParams,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from '../model/role-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  RolePageList = '/sys-role/page',
  GetAllRoleList = '/sys-role/list',
  setRoleStatus = '/sys-role/update-status',
}

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const updateRoleStatus = (data: RoleParams) =>
  defHttp.post({ url: Api.setRoleStatus, data });
