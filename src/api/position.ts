import {
  PositionParams,
  PositionPageListGetResultModel,
  PositionItem,
} from '../model/position-model';
import { defHttp } from 'fe-ent-core/lib/utils';

export const getPositionList = (params?: PositionParams) =>
  defHttp.get<PositionPageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-position/list`,
    params,
  });

export const positionPageQuery = (params?: PositionParams) =>
  defHttp.get<PositionPageListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-position/page`,
    params,
  });

export const saveOrUpdatePosition = (data: PositionItem) => {
  if (data.positionId && data.positionId > 0) {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-position/update`,
      data,
    });
  } else {
    return defHttp.post<void>({
      url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-position/add`,
      data,
    });
  }
};

export const positionDelete = (data: PositionItem) => {
  return defHttp.post<void>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/hr-position/delete`,
    data,
  });
};
