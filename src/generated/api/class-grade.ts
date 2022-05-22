import { ClassGradeRequest, ClassGradeResponse } from '/@/generated/model/class-grade';
import { defHttp } from 'fe-ent-core/lib/utils/http/axios';

export const CreateClassGrade = (data?: ClassGradeRequest) =>
  defHttp.post<ClassGradeResponse>({ url: '/ent-example/class-grade/create', data });

export const BatchCreateClassGrade = (data?: ClassGradeRequest[]) =>
  defHttp.post<number>({ url: '/ent-example/class-grade/batch-create', data });

export const ListQueryClassGrade = (data?: ClassGradeRequest) =>
  defHttp.post<ClassGradeResponse[]>({ url: '/ent-example/class-grade/list', data });

export const PageQueryClassGrade = (data?: ClassGradeRequest) =>
  defHttp.post<number>({ url: '/ent-example/class-grade/page', data });

export const UpdateClassGrade = (data?: ClassGradeRequest) =>
  defHttp.post<ClassGradeResponse>({ url: '/ent-example/class-grade/update', data });

export const DeleteClassGrade = (data?: ClassGradeRequest) =>
  defHttp.post<ClassGradeResponse>({ url: '/ent-example/class-grade/delete', data });

export const BatchDeleteClassGrade = (data?: ClassGradeRequest) =>
  defHttp.post<ClassGradeResponse>({ url: '/ent-example/class-grade/batch-delete', data });
