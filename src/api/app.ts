import { AppModel, AppPageModel } from '../model/app-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  AppPage = '/sys-app/page',
  AppList = '/sys-app/list',
  AppCreate = '/sys-app/add',
  AppUpdate = '/sys-app/update',
  updateActiveFlag = '/sys-app/update-active-flag',
  updateAppStatus = '/sys-app/update-status',
}

export const getAppPage = (params?: AppModel) =>
  defHttp.get<AppPageModel>({ url: Api.AppPage, params });

export const getAppList = (params?: AppModel) =>
  defHttp.get<AppModel[]>({ url: Api.AppList, params });

export const updateActiveFlag = (data: AppModel) =>
  defHttp.post({ url: Api.updateActiveFlag, data });

export const updateAppStatus = (data: AppModel) => defHttp.post({ url: Api.updateAppStatus, data });

export const saveOrUpdateApp = (data: AppModel) => {
  if (data.appId && data.appId > 0) {
    return defHttp.post<void>({ url: Api.AppUpdate, data });
  } else {
    return defHttp.post<void>({ url: Api.AppCreate, data });
  }
};
