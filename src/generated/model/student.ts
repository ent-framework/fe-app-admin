import { BaseRequest } from '/@/generated/model/base-request';
import { BaseResponse } from '/@/generated/model/base-response';

/**
 * 学生 服务请求类
 */
export interface StudentRequest extends BaseRequest {
  id?: number;

  gradeId?: number;

  name?: string;

  cardNum?: string;

  gender?: Gender;

  birthday?: string;

  takeCourses?: string;

  fromForeign?: boolean;

  hometown?: string;

  delFlag?: string;

  version?: number;

  hobbies?: string;
}

export interface StudentResponse extends BaseResponse {
  id?: number;

  gradeId?: number;

  name?: string;

  cardNum?: string;

  gender?: Gender;

  birthday?: string;

  takeCourses?: string;

  fromForeign?: boolean;

  hometown?: string;

  delFlag?: string;

  version?: number;

  hobbies?: string;
}

export interface Gender {
  value?: string;

  label?: string;
}
export const MALE: Gender = { value: '0', label: '男' };

export const FEMALE: Gender = { value: '1', label: '女' };

export const Gender_All = [MALE, FEMALE];
