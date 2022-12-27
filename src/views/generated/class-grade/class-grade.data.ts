import { BasicColumn } from 'fe-ent-core/lib/components/table';
import { FormSchema } from 'fe-ent-core/lib/components/form';
import { GradeType_All } from '/@/generated/model/class-grade';
import { TeacherList } from '/@/generated/api/teacher';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'gradeType',
    width: 120,
  },
  {
    title: '开学时间',
    dataIndex: 'startTime',
    width: 120,
  },
  {
    title: '班主任',
    dataIndex: 'regulator',
    width: 110,
    customRender: ({ text, index }: { text: any; index: number }) => {
      console.log(JSON.stringify(text));
      const name = text?.name;
      const obj: any = {
        children: name,
        attrs: {},
      };
      return obj;
    },
  },
  {
    title: '创建人',
    dataIndex: 'createUserName',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
  },
  {
    title: '更新人',
    dataIndex: 'updateUserName',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 120,
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

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
    required: false,
  },
  {
    field: 'gradeType',
    label: '类型',
    component: 'Select',
    required: true,
    componentProps: {
      options: GradeType_All,
    },
  },
  {
    field: 'startTime',
    label: '开学时间',
    component: 'DatePicker',
    required: false,
  },
  {
    field: 'regulatorId',
    label: '班主任',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      // more details see /src/components/Form/src/components/ApiSelect.vue
      api: TeacherList,
      resultField: 'items',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
    },
  },
];
