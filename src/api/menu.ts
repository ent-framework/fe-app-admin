import {
  MenuParams,
  MenuResourceParams,
  MenuListGetResultModel,
  MenuModel,
} from '../model/menu-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  MenuList = '/sys-menu/list',
  MenuCreate = '/sys-menu/add',
  MenuUpdate = '/sys-menu/update',
  MenuResourceTree = '/sys-menu/get-resource-tree',
  MenuSelectedResource = '/sys-menu/get-select-resource',
  MenuBindResource = '/sys-menu/bind-resource',
}

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getMenuResourceTree = (params?: MenuResourceParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuResourceTree, params });

export const getMenuSelectedResource = (params?: MenuResourceParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuSelectedResource, params });

export const bindMenuResource = (params?: MenuParams) =>
  defHttp.post<void>({ url: Api.MenuBindResource, params });

export const saveOrUpdateMenu = (data: MenuModel) => {
  console.log(data);
  if (data.appId && data.appId > 0) {
    data.menuParentId = -1;
  }
  if (data.menuId && data.menuId > 0) {
    return defHttp.post<void>({ url: Api.MenuUpdate, data });
  } else {
    return defHttp.post<void>({ url: Api.MenuCreate, data });
  }
};
