import { AccountListGetResultModel } from '../model/system-model';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

export const getSysConfigGroupPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/dict/get-config-group-page`,
    params,
  });

export const getLanguageGroupPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/dict/get-languages-page`,
    params,
  });

export const getSysConfigPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-config/page`,
    params,
  });

export const getDictTypePage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/dict-type/page`,
    params,
  });

export const getDictPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/dict/page`,
    params,
  });

export const getLanguagePage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/i18n/page`,
    params,
  });

export const getOnlineUserList = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/online-user-list`,
    params,
  });

export const removeSession = (params: any) =>
  defHttp.post<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_ADMIN_API_PREFIX || ''}/sys-user/remove-session`,
    params,
  });

export const getLoginLogsPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_MISC_API_PREFIX || ''}/login-log/page`,
    params,
  });

export const getLogsPage = (params: any) =>
  defHttp.get<AccountListGetResultModel>({
    url: `${import.meta.env.VITE_MISC_API_PREFIX || ''}/log-manager/page`,
    params,
  });
