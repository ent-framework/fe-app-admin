import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
export const columns: BasicColumn[] = [
  {
    title: '资源名称',
    dataIndex: 'resourceName',
    width: 200,
    fixed: 'left',
  },
  {
    title: '资源编码',
    dataIndex: 'resourceCode',
    width: 180,
  },
  {
    title: '模块名称',
    dataIndex: 'modularName',
    width: 180,
  },
  {
    title: '请求API',
    dataIndex: 'url',
    width: 180,
  },
  {
    title: 'Http方法',
    dataIndex: 'httpMethod',
    width: 180,
  },
  {
    title: '需要登录',
    dataIndex: 'requiredLoginFlag',
    width: 180,
  },
  {
    title: '需要鉴权',
    dataIndex: 'requiredPermissionFlag',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'appCode',
    label: '应用编码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'resourceName',
    label: '资源名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleCode',
    label: '角色编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleSort',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: 'dataScopeType',
    label: '数据范围',
    component: 'Select',
    componentProps: {
      options: [
        { label: '仅本人数据', value: 10 },
        { label: '本部门数据', value: 20 },
        { label: '本部门及以下数据', value: 30 },
        { label: '指定部门数据', value: 40 },
        { label: '全部数据', value: 50 },
      ],
    },
  },
  {
    field: 'statusFlag',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
  },
  {
    field: 'roleSystemFlag',
    label: '系统角色',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
