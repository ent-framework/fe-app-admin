import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { updateRoleStatus } from '/@/api/role';
import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';

export const columns: BasicColumn[] = [
  {
    title: '职位名称',
    dataIndex: 'positionName',
    width: 200,
  },
  {
    title: '职位编码',
    dataIndex: 'positionCode',
    width: 180,
  },
  {
    title: '排序',
    dataIndex: 'positionSort',
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
              createMessage.success(`已成功修改职位状态`);
            })
            .catch(() => {
              createMessage.error('修改职位状态失败');
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
    dataIndex: 'positionRemark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'positionName',
    label: '职位名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'statusFlag',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'positionName',
    label: '职位名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'positionCode',
    label: '职位编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'positionSort',
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
    field: 'positionRemark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
