<template>
  <EntDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="分配角色"
    width="500px"
    @ok="handleSubmit"
  >
    <EntForm @register="registerForm" />
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { grantRoleFormSchema } from './user-data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { grantRole, getUserRoles } from '/@/api/user';

  export default defineComponent({
    name: 'BindResourceDrawer',
    components: { EntDrawer, EntForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const userId = ref(null);
      const checkedKeys = ref<number[]>([]);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: grantRoleFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false, destroyOnClose: true });
        isUpdate.value = !!data?.isUpdate;

        const grantRoleIdList = (
          await getUserRoles({
            userId: data.record.userId,
          })
        ).map((userRole) => userRole.roleId);

        if (unref(isUpdate)) {
          userId.value = data.record.userId;
          await setFieldsValue({
            ...data.record,
            grantRoleIdList,
          });
        }
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          grantRole({ ...values, ...(unref(isUpdate) && { userId: userId.value }) })
            .then(() => {
              createMessage.success(`角色分配成功`);
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
        checkedKeys,
      };
    },
  });
</script>
