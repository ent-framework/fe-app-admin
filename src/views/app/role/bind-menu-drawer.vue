<template>
  <EntDrawer v-bind="$attrs" @register="registerDrawer" showFooter width="500px" @ok="handleSubmit">
    <EntForm @register="registerForm" />
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { bindMenuFormSchema } from './role-data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  import { TreeItem } from 'fe-ent-core/lib/components/tree';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { bindMenu } from '/@/api/role';
  import { getMenuList } from '/@/api/menu';

  export default defineComponent({
    name: 'GrantMenuDrawer',
    components: { EntDrawer, EntForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);
      const { createMessage } = useMessage();
      const roleId = ref(null);
      const title = ref(null);
      const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
        labelWidth: 90,
        schemas: bindMenuFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          roleId.value = data.record.roleId;
          title.value = data.record.roleName;
          await setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getMenuList();
        await updateSchema({
          field: 'menuId',
          componentProps: { treeData },
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          bindMenu({ ...values, ...(unref(isUpdate) && { roleId: roleId.value }) })
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
        handleSubmit,
        treeData,
      };
    },
  });
</script>
