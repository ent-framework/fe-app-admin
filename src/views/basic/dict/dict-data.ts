import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { updateRoleStatus } from '/@/api/role';
import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'dictName',
    width: 200,
  },
  {
    title: '编码',
    dataIndex: 'dictCode',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'dictSort',
    width: 60,
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
          const newStatus = checked ? 1 : 2;
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
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'configName',
    label: '名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'configCode',
    label: '编码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'statusFlag',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'configName',
    label: '名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'configCode',
    label: '属性值',
    required: true,
    component: 'Input',
  },
  {
    field: 'configValue',
    label: '属性值',
    required: true,
    component: 'Input',
  },
  {
    field: 'groupCode',
    label: '分类编码',
    dynamicDisabled: true,
    component: 'Input',
  },
  {
    field: 'sysFlag',
    label: '系统参数',
    component: 'RadioButtonGroup',
    defaultValue: 'Y',
    componentProps: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
  },
  {
    field: 'statusFlag',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
