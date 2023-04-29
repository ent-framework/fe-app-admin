import { ResourcePageListGetResultModel, ResourcePageParams } from '../model/resource-model';
import { defHttp } from 'fe-ent-core/lib/utils';

export const getResourcePageList = (params?: ResourcePageParams) =>
  defHttp.get<ResourcePageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/resource/page`,
    params,
  });

export const getResourceTree = (params?: ResourcePageParams) =>
  defHttp.get<ResourcePageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/resource/tree`,
    params,
  });

export const getResourceMenuList = (params?: ResourcePageParams) =>
  defHttp.get<ResourcePageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/resource/get-menu-resource-list`,
    params,
  });
