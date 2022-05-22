import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { GradeType_All } from '/@/generated/model/class-grade';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'gradeType',
    width: 120,
  },
  {
    title: '开学时间',
    dataIndex: 'startTime',
    width: 120,
  },
  {
    title: '班主任',
    dataIndex: 'regulatorId',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
    required: false,
  },
  {
    field: 'gradeType',
    label: '类型',
    component: 'Select',
    required: true,
    componentProps: {
      options: GradeType_All,
    },
  },
  {
    field: 'startTime',
    label: '开学时间',
    component: 'Input',
    required: false,
  },
  {
    field: 'regulatorId',
    label: '班主任',
    component: 'InputNumber',
    required: true,
  },
];
