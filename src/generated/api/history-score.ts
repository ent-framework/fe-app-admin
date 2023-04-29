import { HistoryScore } from '/@/generated/model/history-score';
import { HistoryScorePageModel } from '/@/generated/model/history-score';
import { defHttp } from 'fe-ent-core/lib/utils';

/**
 * 考试记录 服务请求类
 */
export const HistoryScoreCreate = (request?: HistoryScore) =>
  defHttp.post<HistoryScore>({ url: '/ent-example/history-score/create', data: request });

export const HistoryScoreBatchCreate = (request?: HistoryScore[]) =>
  defHttp.post<HistoryScore[]>({ url: '/ent-example/history-score/batch-create', data: request });

export const HistoryScoreUpdate = (request?: HistoryScore) =>
  defHttp.post<HistoryScore>({ url: '/ent-example/history-score/update', data: request });

export const HistoryScoreList = (request?: HistoryScore) =>
  defHttp.post<HistoryScore[]>({ url: '/ent-example/history-score/list', data: request });

export const HistoryScorePage = (request?: HistoryScore) =>
  defHttp.post<HistoryScorePageModel>({ url: '/ent-example/history-score/page', data: request });

export const HistoryScoreDeleteById = (request?: HistoryScore) =>
  defHttp.post<number>({ url: '/ent-example/history-score/delete-by-id', data: request });

export const HistoryScoreBatchDelete = (request?: HistoryScore) =>
  defHttp.post<number>({ url: '/ent-example/history-score/batch-delete', data: request });

export const HistoryScoreGetById = (request?: HistoryScore) =>
  defHttp.get<HistoryScore>({ url: '/ent-example/history-score/detail', data: request });
