import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';

export const columns: BasicColumn[] = [
  {
    title: '编码',
    dataIndex: 'tranCode',
    width: 200,
  },
  {
    title: '翻译的值',
    dataIndex: 'tranValue',
    width: 200,
  },
  {
    title: '条例名称',
    dataIndex: 'tranName',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'tranCode',
    label: '编码',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'tranName',
    label: '条例名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'tranCode',
    label: '编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'tranValue',
    label: '翻译值',
    required: true,
    component: 'Input',
  },
  {
    field: 'tranLanguageCode',
    label: '语种字典',
    dynamicDisabled: true,
    component: 'Input',
  },
];
