import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface MenuModel {
  menuId?: number;
  menuParentId?: number;
  appId?: number;
  menuName?: string;
  menuType?: number;
  menuCode?: string;
  visible?: string;
  menuSort?: number;
  remark?: string;
  router?: string;
  icon?: string;
  status?: number;
  component?: string;
  linkOpenType?: string;
  linkUrl?: string;
}

export type MenuResourceParams = {
  menuId: number;
  selectedResource?: number[];
};

export type MenuListGetResultModel = BasicFetchResult<MenuModel>;
