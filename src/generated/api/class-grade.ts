import { ClassGrade } from '/@/generated/model/class-grade';
import { ClassGradePageModel } from '/@/generated/model/class-grade';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

/**
 * 班级 服务请求类
 */
export const ClassGradeCreate = (request?: ClassGrade) =>
  defHttp.post<ClassGrade>({ url: '/ent-example/class-grade/create', data: request });

export const ClassGradeBatchCreate = (request?: ClassGrade[]) =>
  defHttp.post<ClassGrade[]>({ url: '/ent-example/class-grade/batch-create', data: request });

export const ClassGradeUpdate = (request?: ClassGrade) =>
  defHttp.post<ClassGrade>({ url: '/ent-example/class-grade/update', data: request });

export const ClassGradeList = (request?: ClassGrade) =>
  defHttp.post<ClassGrade[]>({ url: '/ent-example/class-grade/list', data: request });

export const ClassGradePage = (request?: ClassGrade) =>
  defHttp.post<ClassGradePageModel>({ url: '/ent-example/class-grade/page', data: request });

export const ClassGradeDeleteById = (request?: ClassGrade) =>
  defHttp.post<number>({ url: '/ent-example/class-grade/delete-by-id', data: request });

export const ClassGradeBatchDelete = (request?: ClassGrade) =>
  defHttp.post<number>({ url: '/ent-example/class-grade/batch-delete', data: request });

export const ClassGradeGetById = (request?: ClassGrade) =>
  defHttp.get<ClassGrade>({ url: '/ent-example/class-grade/detail', data: request });
