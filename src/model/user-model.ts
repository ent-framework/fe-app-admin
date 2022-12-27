import { BasicPageParams, BasicFetchResult } from 'fe-ent-core/lib/logics/model';

export type UserParams = BasicPageParams & {
  User?: string;
  nickname?: string;
};

export interface UserModel {
  userId?: number;
  User?: string;
  email?: string;
  nickname?: string;
  role?: number;
  createTime?: string;
  remark?: string;
  status?: number;
}

export interface UserGrantRoleModel {
  userId?: string;
  grantRoleIdList?: string[];
}

export type UserListGetResultModel = BasicFetchResult<UserModel>;
