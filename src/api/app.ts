import { AppModel, AppPageModel } from '../model/app-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  AppPageList = '/sys-app/page',
  GetAllRoleList = '/api/getAllRoleList',
  updateActiveFlag = '/sys-app/update-active-flag',
  updateAppStatus = '/sys-app/update-status',
}

export const getAppPageList = (params?: AppModel) =>
  defHttp.get<AppPageModel>({ url: Api.AppPageList, params });

export const updateActiveFlag = (data: AppModel) =>
  defHttp.post({ url: Api.updateActiveFlag, data });

export const updateAppStatus = (data: AppModel) => defHttp.post({ url: Api.updateAppStatus, data });
