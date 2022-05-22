import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { Gender_All } from '/@/generated/model/student';

export const columns: BasicColumn[] = [
  {
    title: '班级ID',
    dataIndex: 'gradeId',
    width: 120,
  },
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
    title: '学习课程',
    dataIndex: 'takeCourses',
    width: 120,
  },
  {
    title: '外国学生',
    dataIndex: 'fromForeign',
    width: 120,
  },
  {
    title: '籍贯',
    dataIndex: 'hometown',
    width: 120,
  },
  {
    title: '删除标记',
    dataIndex: 'delFlag',
    width: 120,
  },
  {
    title: '版本',
    dataIndex: 'version',
    width: 120,
  },
  {
    title: '爱好',
    dataIndex: 'hobbies',
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
    field: 'gradeId',
    label: '班级ID',
    component: 'InputNumber',
    required: true,
  },
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
    field: 'takeCourses',
    label: '学习课程',
    component: 'Input',
    required: true,
  },
  {
    field: 'fromForeign',
    label: '外国学生',
    component: 'Switch',
    required: true,
  },
  {
    field: 'hometown',
    label: '籍贯',
    component: 'Input',
    required: false,
  },
  {
    field: 'delFlag',
    label: '删除标记',
    component: 'Input',
    required: false,
  },
  {
    field: 'version',
    label: '版本',
    component: 'InputNumber',
    required: false,
  },
  {
    field: 'hobbies',
    label: '爱好',
    component: 'Input',
    required: false,
  },
];
