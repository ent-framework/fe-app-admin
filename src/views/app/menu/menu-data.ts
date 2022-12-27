import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getAppList } from '/@/api/app';
import { EntIcon } from 'fe-ent-core/lib/components/icon';
import { getMenuList } from '/@/api/menu';
export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
    customRender: ({ record }) => {
      if (record.icon) {
        const icon = record.icon;
        return h('span', {}, [h(EntIcon, { icon }), record.menuName]);
      }
      return h('span', {}, record.menuName);
    },
  },
  {
    title: '菜单编码',
    dataIndex: 'menuCode',
    width: 180,
  },
  {
    title: '应用名称',
    dataIndex: 'appName',
    width: 180,
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    width: 80,
    customRender: ({ record }) => {
      let text = '';
      switch (record.menuType) {
        case 0:
          text = '目录';
          break;
        case 1:
          text = '路由菜单';
          break;
        case 2:
          text = '外部链接';
      }
      return text;
    },
  },
  {
    title: '地址',
    dataIndex: 'router',
    width: 150,
  },
  {
    title: '排序',
    dataIndex: 'menuSort',
    width: 50,
  },
  {
    title: '是否可见',
    dataIndex: 'visible',
    width: 80,
    customRender: ({ record }) => {
      const visible = record.visible && record.visible === 'Y';
      const color = visible ? 'green' : 'red';
      const text = visible ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
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
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'appId',
    label: '所属应用',
    component: 'ApiSelect',
    componentProps: {
      // more details see /src/components/Form/src/components/ApiSelect.vue
      api: getAppList,
      // use name as label
      labelField: 'appName',
      // use id as value
      valueField: 'appId',
      // not request untill to select
      immediate: false,
    },
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

const isDir = (type: number) => type == 0;
const isMenu = (type: number) => type == 1;
const isLink = (type: number) => type == 2;

export const formSchema: FormSchema[] = [
  {
    field: 'menuType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '路由菜单', value: 1 },
        { label: '外部链接', value: 2 },
        { label: '按钮', value: 3 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'menuParentId',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    ifShow: ({ values }) => isMenu(values.menuType),
    componentProps: {
      api: getMenuList,
      fieldNames: {
        title: 'menuName',
        key: 'menuId',
        value: 'menuId',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'appId',
    component: 'ApiSelect',
    label: '所属应用',
    ifShow: ({ values }) => isDir(values.menuType),
    componentProps: {
      api: getAppList,
      resultField: 'items',
      // use name as label
      labelField: 'appName',
      // use id as value
      valueField: 'appId',
      // not request untill to select
      immediate: true,
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'menuCode',
    label: '编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'visible',
    label: '是否可见',
    required: true,
    defaultValue: 'Y',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'menuSort',
    label: '排序',
    defaultValue: 0,
    component: 'InputNumber',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
  },
  {
    field: 'router',
    label: '路由地址',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.menuType) || isDir(values.menuType),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'linkUrl',
    label: '链接地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isLink(values.menuType),
  },
  {
    field: 'linkOpenType',
    label: '链接打开方式',
    component: 'RadioButtonGroup',
    defaultValue: 2,
    componentProps: {
      options: [
        { label: '本页面', value: 1 },
        { label: '新页面', value: 2 },
      ],
    },
    ifShow: ({ values }) => isLink(values.menuType),
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const bindResourceFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    dynamicDisabled: true,
    component: 'Input',
  },
  {
    field: 'selectedResource',
    label: '资源',
    slot: 'menu',
    component: 'Input',
  },
];
