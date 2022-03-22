import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;
