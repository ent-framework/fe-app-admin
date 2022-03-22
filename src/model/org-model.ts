import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';

export type OrgParams = {
  orgName?: string;
  statusFlag?: number;
};

export interface OrgListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface OrgItem {
  orgId?: number;
  orgParentId?: number;
  orgName: string;
  orgCode: string;
  orgSort: number;
  statusFlag: number;
  orgRemark: string;
}

export type OrgListGetResultModel = BasicFetchResult<OrgListItem>;

export type RolePageListGetResultModel = BasicFetchResult<OrgItem>;
