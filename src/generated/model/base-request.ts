export interface BaseRequest {
  searchBeginTime?: string;

  searchEndTime?: string;

  pageSize?: number;

  pageNo?: number;

  orderBy?: string;

  sortBy?: string;

  otherParams?: any;

  requestNo?: string;

  spanId?: string;

  token?: string;

  createUser?: number;

  updateUser?: number;
}
