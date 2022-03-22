import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { getOrgTree } from '/@/api/org';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
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

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  {
    field: 'realName',
    label: '姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    field: 'birthday',
    label: '生日',
    component: 'DatePicker',
    required: true,
    ifShow: false,
  },
  {
    field: 'sex',
    label: '性别',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '男', value: 'M' },
        { label: '女', value: 'F' },
      ],
    },
  },
  {
    field: 'phone',
    label: '手机',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'tel',
    label: '电话',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'orgId',
    label: '部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getOrgTree,
      resultField: 'items',
    },
    required: true,
  },
  {
    field: 'positionId',
    label: '职位',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
