import { BaseRequest } from '/@/generated/model/base-request';
import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';

/**
 * 学生 服务请求类
 */
export interface Student extends BaseRequest {
  /**
   * Id
   */
  id?: number;

  /**
   * 班级ID
   */
  gradeId?: number;

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
   * 学习课程
   */
  takeCourses?: string[];

  /**
   * 外国学生
   */
  fromForeign?: boolean;

  /**
   * 籍贯
   */
  hometown?: string;

  /**
   * 版本
   */
  version?: number;

  /**
   * 爱好
   */
  hobbies?: string;

  ids?: number[];
}

export type StudentPageModel = BasicFetchResult<Student>;

export interface Gender {
  value?: string;

  label?: string;
}
export const MALE: Gender = { value: '0', label: '男' };

export const FEMALE: Gender = { value: '1', label: '女' };

export const Gender_All = [MALE, FEMALE];
