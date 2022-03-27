import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { updateRoleStatus } from '/@/api/role';
import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200,
    fixed: 'left',
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    width: 180,
  },
  {
    title: '排序',
    dataIndex: 'roleSort',
    width: 50,
  },
  {
    title: '角色级别',
    dataIndex: 'roleTypeCode',
    width: 100,
  },
  {
    title: '角色类型',
    dataIndex: 'roleSystemFlag',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'statusFlag',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.statusFlag === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          updateRoleStatus({ ...record, statusFlag: newStatus })
            .then(() => {
              record.statusFlag = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '备注',
    width: 200,
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
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
    colProps: { span: 8 },
  },
];

const needAssignOrgs = (type: number) => type == 40;
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
    field: 'grantMenuIdList',
    slot: 'menu',
    component: 'Input',
  },
];

export const grantOrgFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    dynamicDisabled: true,
    component: 'Input',
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
    label: ' ',
    field: 'grantOrgIdList',
    ifShow: ({ values }) => needAssignOrgs(values.dataScopeType),
    slot: 'org',
    component: 'Input',
  },
];

export const grantMenuFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    dynamicDisabled: true,
    component: 'Input',
  },
  {
    label: ' ',
    field: 'grantMenuIdList',
    slot: 'menu',
    component: 'Input',
  },
];

export const grantResourceFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    dynamicDisabled: true,
    component: 'Input',
  },
  {
    label: ' ',
    field: 'grantResourceList',
    slot: 'resource',
    component: 'Input',
  },
];

export const bindMenuFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    dynamicDisabled: true,
    component: 'Input',
  },
  {
    field: 'menuId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'menuName',
        key: 'menuId',
        value: 'menuId',
      },
      getPopupContainer: () => document.body,
    },
  },
];
