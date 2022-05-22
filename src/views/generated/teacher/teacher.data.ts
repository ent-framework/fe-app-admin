import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { Gender_All } from '/@/generated/model/teacher';

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '卡号',
    dataIndex: 'cardNum',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 120,
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    width: 120,
  },
  {
    title: '级别',
    dataIndex: 'workSeniority',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'statusFlag',
    width: 120,
  },
  {
    title: '教授课程',
    dataIndex: 'techCourses',
    width: 120,
  },
  {
    title: '属性',
    dataIndex: 'properties',
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
    label: '姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'cardNum',
    label: '卡号',
    component: 'Input',
    required: true,
  },
  {
    field: 'gender',
    label: '性别',
    component: 'Select',
    required: true,
    componentProps: {
      options: Gender_All,
    },
  },
  {
    field: 'birthday',
    label: '生日',
    component: 'Input',
    required: false,
  },
  {
    field: 'workSeniority',
    label: '级别',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'statusFlag',
    label: '状态',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'techCourses',
    label: '教授课程',
    component: 'Input',
    required: false,
  },
  {
    field: 'properties',
    label: '属性',
    component: 'Input',
    required: false,
  },
];
