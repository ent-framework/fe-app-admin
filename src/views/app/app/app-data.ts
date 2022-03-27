import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { updateAppStatus, updateActiveFlag } from '/@/api/app';
import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
import { EntIcon } from 'fe-ent-core/lib/components/icon';

export const columns: BasicColumn[] = [
  {
    title: '应用名称',
    dataIndex: 'appName',
    width: 100,
    align: 'left',
    customRender: ({ record }) => {
      if (record.appIcon) {
        const icon = record.appIcon;
        return h('span', {}, [h(EntIcon, { icon }), record.appName]);
      }
      return h('span', {}, record.appName);
    },
  },
  {
    title: '应用编码',
    dataIndex: 'appCode',
    width: 100,
  },
  {
    title: '顺序',
    dataIndex: 'appSort',
    width: 50,
  },
  {
    title: '默认应用',
    dataIndex: 'activeFlag',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.activeFlag === 'Y',
        checkedChildren: '是',
        unCheckedChildren: '否',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 'Y' : 'N';
          const { createMessage } = useMessage();
          updateActiveFlag({ ...record, activeFlag: newStatus })
            .then(() => {
              record.activeFlag = newStatus;
              createMessage.success(`已成功设置应用标识`);
            })
            .catch(() => {
              createMessage.error('修改默认应用标识失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
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
          updateAppStatus({ ...record, statusFlag: newStatus })
            .then(() => {
              record.statusFlag = newStatus;
              createMessage.success(`已成功修改应用状态`);
            })
            .catch(() => {
              createMessage.error('修改应用状态失败');
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
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 180,
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

export const formSchema: FormSchema[] = [
  {
    field: 'appName',
    label: '应用名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'appCode',
    label: '编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'appSort',
    label: '排序',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'appIcon',
    label: '图标',
    component: 'IconPicker',
  },
  {
    field: 'activeFlag',
    label: '默认首页展开',
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
    field: 'remark',
    component: 'InputTextArea',
  },
];
