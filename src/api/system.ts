import {
  AccountListGetResultModel,
} from '../model/system-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

enum Api {
  SysConfigGroupPage = '/dict/get-config-group-page',
  LanguageGroupPage = '/dict/get-languages-page',
  SysConfigPage = '/sys-config/page',
  DictTypePage = '/dict-type/page',
  DictPage = '/dict/page',
  LanguagePage = '/i18n/page',
  LanguageCreate = '/i18n/create',
  OnlineUserList = '/sys-user/online-user-list',
  RemoveSession = '/sys-user/remove-session',
  LoginLogsPage = '/login-log/page',
  LoginLogsDetail = '/login-log/detail',
  LoginLogsDeleteAll = '/login-log/delete-all',
  LogsPage = '/log-manager/page',
  LogsList = '/log-manager/list',
  LogsDetail = '/log-manager/detail',
  LogsRemove = '/log-manager/remove',
}

export const getSysConfigGroupPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.SysConfigGroupPage, params });

export const getLanguageGroupPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.LanguageGroupPage, params });

export const getSysConfigPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.SysConfigPage, params });

export const getDictTypePage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.DictTypePage, params });

export const getDictPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.DictPage, params });

export const getLanguagePage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.LanguagePage, params });

export const getOnlineUserList = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.OnlineUserList, params });

export const removeSession = (params: any) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.RemoveSession, params });

export const getLoginLogsPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.LoginLogsPage, params });

export const getLogsPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.LogsPage, params });
