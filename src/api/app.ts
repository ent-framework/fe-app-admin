import { AppModel, AppPageModel } from '../model/app-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

export const getAppPage = (params?: AppModel) =>
  defHttp.get<AppPageModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-app/page`,
    params,
  });

export const getAppList = (params?: AppModel) =>
  defHttp.get<AppModel[]>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-app/list`,
    params,
  });

export const updateActiveFlag = (data: AppModel) =>
  defHttp.post({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-app/update-active-flag`,
    data,
  });

export const updateAppStatus = (data: AppModel) =>
  defHttp.post({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-app/update-status`,
    data,
  });

export const saveOrUpdateApp = (data: AppModel) => {
  if (data.appId && data.appId > 0) {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-app/update`,
      data,
    });
  } else {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-app/add`,
      data,
    });
  }
};
