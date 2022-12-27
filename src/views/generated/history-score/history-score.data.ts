import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { ExamType_All } from '/@/generated/model/history-score';

export const columns: BasicColumn[] = [
  {
    title: '学生ID',
    dataIndex: 'studentId',
    width: 120,
  },
  {
    title: '考试时间',
    dataIndex: 'examTime',
    width: 120,
  },
  {
    title: '考试类型',
    dataIndex: 'examType',
    width: 120,
  },
  {
    title: '总分数',
    dataIndex: 'totalScore',
    width: 120,
  },
  {
    title: '分数',
    dataIndex: 'score',
    width: 120,
  },
  {
    title: '创建人',
    dataIndex: 'createUserName',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
  },
  {
    title: '更新人',
    dataIndex: 'updateUserName',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
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
    field: 'studentId',
    label: '学生ID',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'examTime',
    label: '考试时间',
    component: 'DatePicker',
    required: true,
  },
  {
    field: 'examType',
    label: '考试类型',
    component: 'Select',
    required: true,
    componentProps: {
      options: ExamType_All,
    },
  },
  {
    field: 'totalScore',
    label: '总分数',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'score',
    label: '分数',
    component: 'Input',
    required: true,
  },
];
