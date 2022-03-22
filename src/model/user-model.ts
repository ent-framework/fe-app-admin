import { BasicPageParams, BasicFetchResult } from 'fe-ent-core/lib/logics/model';

export type UserParams = BasicPageParams & {
  User?: string;
  nickname?: string;
};

export interface UserListItem {
  id: string;
  User: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export type UserListGetResultModel = BasicFetchResult<UserListItem>;
