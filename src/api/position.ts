import {
  PositionParams,
  PositionPageListGetResultModel,
  PositionItem,
} from '../model/position-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  PositionPage = '/hr-position/page',
  PositionList = '/hr-position/list',
  PositionCreate = '/hr-position/add',
  PositionUpdate = '/hr-position/update',
  PositionDelete = '/hr-position/delete',
}

export const getPositionList = (params?: PositionParams) =>
  defHttp.get<PositionPageListGetResultModel>({ url: Api.PositionList, params });

export const positionPageQuery = (params?: PositionParams) =>
  defHttp.get<PositionPageListGetResultModel>({ url: Api.PositionPage, params });

export const saveOrUpdatePosition = (data: PositionItem) => {
  if (data.positionId && data.positionId > 0) {
    return defHttp.post<void>({ url: Api.PositionUpdate, data });
  } else {
    return defHttp.post<void>({ url: Api.PositionCreate, data });
  }
};

export const positionDelete = (data: PositionItem) => {
  return defHttp.post<void>({ url: Api.PositionDelete, data });
};
