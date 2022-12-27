export interface StatusEnum {
  value?: number;

  label?: string;
}
export const ENABLE: StatusEnum = { value: 1, label: '启用' };

export const DISABLE: StatusEnum = { value: 2, label: '禁用' };

export const StatusEnum_All = [ENABLE, DISABLE];
