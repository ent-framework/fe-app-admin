import { BaseRequest } from '/@/generated/model/base-request';
import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';

/**
 * 考试记录 服务请求类
 */
export interface HistoryScore extends BaseRequest {
  /**
   * Id
   */
  id?: number;

  /**
   * 学生ID
   */
  studentId?: number;

  /**
   * 考试时间
   */
  examTime?: string;

  /**
   * 考试类型[MONTHLY(0):月考,MID_TERM(1):期中,FINAL(2):期末]
   */
  examType?: ExamType;

  /**
   * 总分数
   */
  totalScore?: number;

  /**
   * 分数
   */
  score?: Map<string, number>;

  ids?: number[];
}

export type HistoryScorePageModel = BasicFetchResult<HistoryScore>;

export interface ExamType {
  value?: string;

  label?: string;
}
export const MONTHLY: ExamType = { value: '0', label: '月考' };

export const MID_TERM: ExamType = { value: '1', label: '期中' };

export const FINAL: ExamType = { value: '2', label: '期末' };

export const ExamType_All = [MONTHLY, MID_TERM, FINAL];
