import { ResourcePageListGetResultModel, ResourcePageParams } from '../model/resource-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  ResourcePage = '/resource/page',
  ResourceTree = '/resource/tree',
  ResourceMenuList = '/resource/get-menu-resource-list',
}

export const getResourcePageList = (params?: ResourcePageParams) =>
  defHttp.get<ResourcePageListGetResultModel>({ url: Api.ResourcePage, params });

export const getResourceTree = (params?: ResourcePageParams) =>
  defHttp.get<ResourcePageListGetResultModel>({ url: Api.ResourceTree, params });

export const getResourceMenuList = (params?: ResourcePageParams) =>
  defHttp.get<ResourcePageListGetResultModel>({ url: Api.ResourceMenuList, params });
