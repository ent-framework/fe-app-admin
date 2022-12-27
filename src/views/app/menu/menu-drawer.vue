<template>
  <EntDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <EntForm @register="registerForm" />
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { formSchema } from './menu-data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  import { saveOrUpdateMenu } from '/@/api/menu';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { EntDrawer, EntForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const menuId = ref(null);
      const { createMessage } = useMessage();
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false, destroyOnClose: true });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          menuId.value = data.record.menuId;
          await setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          saveOrUpdateMenu({ ...values, ...(unref(isUpdate) && { menuId: menuId.value }) })
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

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
