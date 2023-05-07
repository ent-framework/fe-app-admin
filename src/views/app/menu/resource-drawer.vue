<template>
  <EntDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="挂载资源"
    width="500px"
    @ok="handleSubmit"
  >
    <EntForm @register="registerForm">
      <template #menu="{ model, field }">
        <EntTree
          v-model:value="model[field]"
          :treeData="resourceData"
          :fieldNames="{ title: 'nodeName', key: 'code' }"
          checkable
          :checkedKeys="checkedKeys"
          toolbar
          title="选择资源"
        />
      </template>
    </EntForm>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { bindResourceFormSchema } from './menu-data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  import { EntTree, TreeItem } from 'fe-ent-core/lib/components/tree';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { bindMenuResource, getMenuResourceTree, getMenuSelectedResource } from '/@/api/menu';

  export default defineComponent({
    name: 'BindResourceDrawer',
    components: { EntDrawer, EntForm, EntTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const resourceData = ref<TreeItem[]>([]);
      const { createMessage } = useMessage();
      const menuId = ref(null);
      const checkedKeys = ref<number[]>([]);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: bindResourceFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false, destroyOnClose: true });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        menuId.value = data.record.menuId;
        resourceData.value = (await getMenuResourceTree({
          menuId: data.record.menuId,
        })) as any as TreeItem[];

        isUpdate.value = !!data?.isUpdate;

        checkedKeys.value = (await getMenuSelectedResource({
          menuId: data.record.menuId,
        })) as any as number[];

        if (unref(isUpdate)) {
          await setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          bindMenuResource({ ...values, ...(unref(isUpdate) && { menuId: menuId.value }) })
            .then(() => {
              createMessage.success(`保存成功`);
              closeDrawer();
              emit('success');
            })
            .catch();
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        resourceData,
        checkedKeys,
      };
    },
  });
</script>
