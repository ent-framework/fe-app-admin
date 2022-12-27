import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
import { updateRoleStatus } from '/@/api/role';
import { getOrgTree } from '/@/api/org';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'orgName',
    width: 400,
    align: 'left',
  },
  {
    title: '部门编码',
    dataIndex: 'orgCode',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'orgSort',
    width: 50,
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
              createMessage.success(`已成功修改部门状态`);
            })
            .catch(() => {
              createMessage.error('修改部门状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '描述',
    dataIndex: 'orgRemark',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '部门名称',
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

export const formSchema: FormSchema[] = [
  {
    field: 'orgName',
    label: '部门名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'orgCode',
    label: '部门编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'orgSort',
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
    label: '备注',
    field: 'orgRemark',
    component: 'InputTextArea',
  },
  {
    label: '所属部门',
    field: 'orgParentId',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getOrgTree,
      resultField: 'items',
    },
    colProps: {
      span: 12,
    },
  },
];
