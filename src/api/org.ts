import { OrgParams, OrgListGetResultModel, OrgItem } from '../model/org-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  OrgList = '/hr-organization/list',
  OrgTree = '/hr-organization/tree',
  OrgCreate = '/hr-organization/add',
  OrgUpdate = '/hr-organization/update',
}

export const getOrgList = (params?: OrgParams) =>
  defHttp.get<OrgListGetResultModel>({ url: Api.OrgList, params });

export const getOrgTree = (params?: OrgParams) =>
  defHttp.get<OrgListGetResultModel>({ url: Api.OrgTree, params });

export const saveOrUpdateOrg = (data: OrgItem) => {
  if (data.orgId && data?.orgId > 0) {
    return defHttp.post<void>({ url: Api.OrgUpdate, data });
  } else {
    return defHttp.post<void>({ url: Api.OrgCreate, data });
  }
};
