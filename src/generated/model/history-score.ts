import { BaseRequest } from '/@/generated/model/base-request';
import { BaseResponse } from '/@/generated/model/base-response';

/**
 * 考试记录 服务请求类
 */
export interface HistoryScoreRequest extends BaseRequest {
  id?: number;

  studentId?: number;

  examTime?: string;

  examType?: ExamType;

  totalScore?: number;

  score?: string;
}

export interface HistoryScoreResponse extends BaseResponse {
  id?: number;

  studentId?: number;

  examTime?: string;

  examType?: ExamType;

  totalScore?: number;

  score?: string;
}

export interface ExamType {
  value?: string;

  label?: string;
}
export const MONTHLY: ExamType = { value: '0', label: '月考' };

export const MID_TERM: ExamType = { value: '1', label: '期中' };

export const FINAL: ExamType = { value: '2', label: '期末' };

export const ExamType_All = [MONTHLY, MID_TERM, FINAL];
