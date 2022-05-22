import { BaseRequest } from '/@/generated/model/base-request';
import { BaseResponse } from '/@/generated/model/base-response';

/**
 * 班级 服务请求类
 */
export interface ClassGradeRequest extends BaseRequest {
  id?: number;

  name?: string;

  description?: string;

  gradeType?: GradeType;

  startTime?: string;

  regulatorId?: number;
}

export interface ClassGradeResponse extends BaseResponse {
  id?: number;

  name?: string;

  description?: string;

  gradeType?: GradeType;

  startTime?: string;

  regulatorId?: number;
}

export interface GradeType {
  value?: string;

  label?: string;
}
export const ADVANCE: GradeType = { value: '0', label: '高级' };

export const COMMON: GradeType = { value: '1', label: '普通' };

export const GradeType_All = [ADVANCE, COMMON];
