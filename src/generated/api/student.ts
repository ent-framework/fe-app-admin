import { StudentRequest, StudentResponse } from '/@/generated/model/student';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

export const CreateStudent = (data?: StudentRequest) =>
  defHttp.post<StudentResponse>({ url: '/ent-example/student/create', data });

export const BatchCreateStudent = (data?: StudentRequest[]) =>
  defHttp.post<number>({ url: '/ent-example/student/batch-create', data });

export const ListQueryStudent = (data?: StudentRequest) =>
  defHttp.post<StudentResponse[]>({ url: '/ent-example/student/list', data });

export const PageQueryStudent = (data?: StudentRequest) =>
  defHttp.post<number>({ url: '/ent-example/student/page', data });

export const UpdateStudent = (data?: StudentRequest) =>
  defHttp.post<StudentResponse>({ url: '/ent-example/student/update', data });

export const DeleteStudent = (data?: StudentRequest) =>
  defHttp.post<StudentResponse>({ url: '/ent-example/student/delete', data });

export const BatchDeleteStudent = (data?: StudentRequest) =>
  defHttp.post<StudentResponse>({ url: '/ent-example/student/batch-delete', data });
