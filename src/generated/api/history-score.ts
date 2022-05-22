import { HistoryScoreRequest, HistoryScoreResponse } from '/@/generated/model/history-score';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

export const CreateHistoryScore = (data?: HistoryScoreRequest) =>
  defHttp.post<HistoryScoreResponse>({ url: '/ent-example/history-score/create', data });

export const BatchCreateHistoryScore = (data?: HistoryScoreRequest[]) =>
  defHttp.post<number>({ url: '/ent-example/history-score/batch-create', data });

export const ListQueryHistoryScore = (data?: HistoryScoreRequest) =>
  defHttp.post<HistoryScoreResponse[]>({ url: '/ent-example/history-score/list', data });

export const PageQueryHistoryScore = (data?: HistoryScoreRequest) =>
  defHttp.post<number>({ url: '/ent-example/history-score/page', data });

export const UpdateHistoryScore = (data?: HistoryScoreRequest) =>
  defHttp.post<HistoryScoreResponse>({ url: '/ent-example/history-score/update', data });

export const DeleteHistoryScore = (data?: HistoryScoreRequest) =>
  defHttp.post<HistoryScoreResponse>({ url: '/ent-example/history-score/delete', data });

export const BatchDeleteHistoryScore = (data?: HistoryScoreRequest) =>
  defHttp.post<HistoryScoreResponse>({ url: '/ent-example/history-score/batch-delete', data });
