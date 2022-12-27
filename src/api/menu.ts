import {
  MenuParams,
  MenuResourceParams,
  MenuListGetResultModel,
  MenuModel,
} from '../model/menu-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-menu/list`,
    params,
  });

export const getMenuResourceTree = (params?: MenuResourceParams) =>
  defHttp.get<MenuListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-menu/get-resource-tree`,
    params,
  });

export const getMenuSelectedResource = (params?: MenuResourceParams) =>
  defHttp.get<MenuListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-menu/get-select-resource`,
    params,
  });

export const bindMenuResource = (params?: MenuParams) =>
  defHttp.post<void>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-menu/bind-resource`,
    params,
  });

export const saveOrUpdateMenu = (data: MenuModel) => {
  console.log(data);
  if (data.appId && data.appId > 0) {
    data.menuParentId = -1;
  }
  if (data.menuId && data.menuId > 0) {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-menu/update`,
      data,
    });
  } else {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-menu/add`,
      data,
    });
  }
};

export const getUserLeftMenus = (params?: MenuResourceParams) =>
  defHttp.get<MenuListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-menu/get-left-menus`,
    params,
  });
