import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';

export interface AppModel {
  appId?: number;
  activeFlag?: string;
  appCode?: string;
  appIcon?: string;
  appName?: string;
  appSort?: number;
  createTime?: string;
  createUser?: number;
  delFlag?: string;
  statusFlag?: number;
  updateTime?: string;
  updateUser?: number;
}
export type AppPageModel = BasicFetchResult<AppModel>;
