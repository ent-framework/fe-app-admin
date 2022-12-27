import { BaseRequest } from '/@/generated/model/base-request';
import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';
import { StatusEnum } from '/@/generated/model/enum/status-enum';

/**
 * 教师 服务请求类
 */
export interface Teacher extends BaseRequest {
  /**
   * Id
   */
  id?: number;

  /**
   * 姓名
   */
  name?: string;

  /**
   * 卡号
   */
  cardNum?: string;

  /**
   * 性别[MALE(0):男,FEMALE(1):女]
   */
  gender?: Gender;

  /**
   * 生日
   */
  birthday?: string;

  /**
   * 级别
   */
  workSeniority?: number;

  /**
   * 状态
   */
  statusFlag?: StatusEnum;

  /**
   * 教授课程
   */
  techCourses?: string[];

  /**
   * 属性
   */
  properties?: any;

  ids?: number[];
}

export type TeacherPageModel = BasicFetchResult<Teacher>;

export interface Gender {
  value?: string;

  label?: string;
}
export const MALE: Gender = { value: '0', label: '男' };

export const FEMALE: Gender = { value: '1', label: '女' };

export const Gender_All = [MALE, FEMALE];
