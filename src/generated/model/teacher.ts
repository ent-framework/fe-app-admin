import { BaseRequest } from '/@/generated/model/base-request';
import { BaseResponse } from '/@/generated/model/base-response';

/**
 * 教师 服务请求类
 */
export interface TeacherRequest extends BaseRequest {
  id?: number;

  name?: string;

  cardNum?: string;

  gender?: Gender;

  birthday?: string;

  workSeniority?: number;

  statusFlag?: Byte;

  techCourses?: string;

  properties?: byte[];
}

export interface TeacherResponse extends BaseResponse {
  id?: number;

  name?: string;

  cardNum?: string;

  gender?: Gender;

  birthday?: string;

  workSeniority?: number;

  statusFlag?: Byte;

  techCourses?: string;

  properties?: byte[];
}

export interface Gender {
  value?: string;

  label?: string;
}
export const MALE: Gender = { value: '0', label: '男' };

export const FEMALE: Gender = { value: '1', label: '女' };

export const Gender_All = [MALE, FEMALE];
