import { BaseRequest } from '/@/generated/model/base-request';
import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';
import { Student } from '/@/generated/model/student';
import { Teacher } from '/@/generated/model/teacher';

/**
 * 班级 服务请求类
 */
export interface ClassGrade extends BaseRequest {
  /**
   * ID
   */
  id?: number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 类型[ADVANCE(0):高级,COMMON(1):普通]
   */
  gradeType?: GradeType;

  /**
   * 开学时间
   */
  startTime?: string;

  /**
   * 班主任
   */
  regulatorId?: number;

  /**
   * 学生
   */
  students?: Student;

  /**
   * 班主任
   */
  regulator?: Teacher;

  ids?: number[];
}

export type ClassGradePageModel = BasicFetchResult<ClassGrade>;

export interface GradeType {
  value?: string;

  label?: string;
}
export const ADVANCE: GradeType = { value: '0', label: '高级' };

export const COMMON: GradeType = { value: '1', label: '普通' };

export const GradeType_All = [ADVANCE, COMMON];
