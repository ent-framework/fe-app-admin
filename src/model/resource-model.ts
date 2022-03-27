import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';

export interface ResourceModel {
  resourceId?: number;
  appCode?: any;
  className?: any;
  createTime?: any;
  createUser?: any;
  httpMethod?: any;
  ipAddress?: any;
  methodName?: any;
  modularCode?: any;
  modularName?: any;
  paramFieldDescriptions?: any;
  projectCode?: any;
  requiredLoginFlag?: any;
  requiredPermissionFlag?: any;
  resourceCode?: any;
  resourceName?: any;
  responseFieldDescriptions?: any;
  url?: any;
  validateGroups?: any;
  viewFlag?: any;
}

export interface ResourcePageParams {

}

export type ResourcePageListGetResultModel = BasicFetchResult<ResourceModel>;
