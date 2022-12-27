import { Teacher } from '/@/generated/model/teacher';
import { TeacherPageModel } from '/@/generated/model/teacher';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

/**
 * 教师 服务请求类
 */
export const TeacherCreate = (request?: Teacher) =>
  defHttp.post<Teacher>({ url: '/ent-example/teacher/create', data: request });

export const TeacherBatchCreate = (request?: Teacher[]) =>
  defHttp.post<Teacher[]>({ url: '/ent-example/teacher/batch-create', data: request });

export const TeacherUpdate = (request?: Teacher) =>
  defHttp.post<Teacher>({ url: '/ent-example/teacher/update', data: request });

export const TeacherList = (request?: Teacher) =>
  defHttp.post<Teacher[]>({ url: '/ent-example/teacher/list', data: request });

export const TeacherPage = (request?: Teacher) =>
  defHttp.post<TeacherPageModel>({ url: '/ent-example/teacher/page', data: request });

export const TeacherDeleteById = (request?: Teacher) =>
  defHttp.post<number>({ url: '/ent-example/teacher/delete-by-id', data: request });

export const TeacherBatchDelete = (request?: Teacher) =>
  defHttp.post<number>({ url: '/ent-example/teacher/batch-delete', data: request });

export const TeacherGetById = (request?: Teacher) =>
  defHttp.get<Teacher>({ url: '/ent-example/teacher/detail', data: request });
