import { Student } from '/@/generated/model/student';
import { StudentPageModel } from '/@/generated/model/student';
import { defHttp } from 'fe-ent-core/lib/utils';

/**
 * 学生 服务请求类
 */
export const StudentCreate = (request?: Student) =>
  defHttp.post<Student>({ url: '/ent-example/student/create', data: request });

export const StudentBatchCreate = (request?: Student[]) =>
  defHttp.post<Student[]>({ url: '/ent-example/student/batch-create', data: request });

export const StudentUpdate = (request?: Student) =>
  defHttp.post<Student>({ url: '/ent-example/student/update', data: request });

export const StudentList = (request?: Student) =>
  defHttp.post<Student[]>({ url: '/ent-example/student/list', data: request });

export const StudentPage = (request?: Student) =>
  defHttp.post<StudentPageModel>({ url: '/ent-example/student/page', data: request });

export const StudentDeleteById = (request?: Student) =>
  defHttp.post<number>({ url: '/ent-example/student/delete-by-id', data: request });

export const StudentBatchDelete = (request?: Student) =>
  defHttp.post<number>({ url: '/ent-example/student/batch-delete', data: request });

export const StudentGetById = (request?: Student) =>
  defHttp.get<Student>({ url: '/ent-example/student/detail', data: request });
