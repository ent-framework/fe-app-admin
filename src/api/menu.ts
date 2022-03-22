import { MenuParams, MenuListGetResultModel } from '../model/menu-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  MenuList = '/sys-menu/list',
}

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });
