import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { getOrgTree } from '/@/api/org';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
import { updateUserStatus } from '/@/api/user';
import { getPositionList } from '/@/api/position';
import { getRoleDropdown } from '/@/api/role';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'account',
    width: 120,
    fixed: 'left',
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 120,
  },
  {
    title: '部门',
    dataIndex: 'organization.orgName',
    customRender: ({ record }) => {
      if (record.organization) {
        return record.organization.orgName;
      }
      return '';
    },
    width: 120,
  },
  {
    title: '职位',
    dataIndex: 'position.positionName',
    customRender: ({ record }) => {
      if (record.position) {
        return record.position.positionName;
      }
      return '';
    },
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
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
          updateUserStatus({ ...record, statusFlag: newStatus })
            .then(() => {
              record.statusFlag = newStatus;
              createMessage.success(`已成功修改用户状态`);
            })
            .catch(() => {
              createMessage.error('修改用户状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
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
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
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
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'positionId',
    label: '职位',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getPositionList,
      // use name as label
      labelField: 'positionName',
      // use id as value
      valueField: 'positionId',
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const grantRoleFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    dynamicDisabled: true,
    component: 'Input',
  },
  {
    field: 'grantRoleIdList',
    label: '角色',
    component: 'ApiSelect',
    componentProps: {
      api: getRoleDropdown,
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      mode: 'multiple',
    },
  },
];
