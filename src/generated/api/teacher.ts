import { TeacherRequest, TeacherResponse } from '/@/generated/model/teacher';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

export const CreateTeacher = (data?: TeacherRequest) =>
  defHttp.post<TeacherResponse>({ url: '/ent-example/teacher/create', data });

export const BatchCreateTeacher = (data?: TeacherRequest[]) =>
  defHttp.post<number>({ url: '/ent-example/teacher/batch-create', data });

export const ListQueryTeacher = (data?: TeacherRequest) =>
  defHttp.post<TeacherResponse[]>({ url: '/ent-example/teacher/list', data });

export const PageQueryTeacher = (data?: TeacherRequest) =>
  defHttp.post<number>({ url: '/ent-example/teacher/page', data });

export const UpdateTeacher = (data?: TeacherRequest) =>
  defHttp.post<TeacherResponse>({ url: '/ent-example/teacher/update', data });

export const DeleteTeacher = (data?: TeacherRequest) =>
  defHttp.post<TeacherResponse>({ url: '/ent-example/teacher/delete', data });

export const BatchDeleteTeacher = (data?: TeacherRequest) =>
  defHttp.post<TeacherResponse>({ url: '/ent-example/teacher/batch-delete', data });
