import { BasicFetchResult } from 'fe-ent-core/lib/logics/model';

export type PositionParams = {
  orgName?: string;
  statusFlag?: number;
};

export interface PositionItem {
  positionId?: number;
  positionName: string;
  positionCode: string;
  positionSort: number;
  statusFlag: number;
  positionRemark: string;
}

export type PositionPageListGetResultModel = BasicFetchResult<PositionItem>;
