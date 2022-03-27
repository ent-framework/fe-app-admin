import { BasicPageParams, BasicFetchResult } from 'fe-ent-core/lib/logics/model';
import { CheckKeys } from 'fe-ent-core/lib/components/tree';

export type RoleParams = {
  roleName?: string;
  statusFlag?: number;
};

export type RolePageParams = BasicPageParams & RoleParams;

export interface RoleModel {
  roleId?: number;
  roleName?: string;
  roleCode?: string;
  roleSort: number;
  dataScopeType: number;
  statusFlag: number;
  remark: string;
  roleSystemFlag: string;
  roleTypeCode: string;
}

export interface GrantMenuRoleParams {
  roleId?: number;
  grantMenuIdList: CheckKeys;
}

export interface GrantMenuResourceParams {
  roleId?: number;
  grantMenuIdList?: CheckKeys;
}

export interface RoleRequest extends RoleModel {
  grantAddMenuFlag?: boolean;
}

export type RolePageListGetResultModel = BasicFetchResult<RoleModel>;

export type RoleListGetResultModel = RoleModel[];
