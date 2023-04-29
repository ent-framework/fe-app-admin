import { OrgParams, OrgListGetResultModel, OrgItem } from '../model/org-model';
import { defHttp } from 'fe-ent-core/lib/utils';

export const getOrgList = (params?: OrgParams) =>
  defHttp.get<OrgListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-organization/list`,
    params,
  });

export const getOrgTree = (params?: OrgParams) =>
  defHttp.get<OrgListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-organization/tree`,
    params,
  });

export const saveOrUpdateOrg = (data: OrgItem) => {
  if (!data.orgParentId) {
    data.orgParentId = -1;
  }
  if (data.orgId && data?.orgId > 0) {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-organization/update`,
      data,
    });
  } else {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-organization/add`,
      data,
    });
  }
};
