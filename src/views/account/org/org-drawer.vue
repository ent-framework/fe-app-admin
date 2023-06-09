<template>
  <EntDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <EntForm @register="registerForm" />
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components';
  import { formSchema } from './org-data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components';
  import { useMessage } from 'fe-ent-core/lib/hooks';
  import { saveOrUpdateOrg } from '/@/api/org';

  export default defineComponent({
    name: 'OrgDrawer',
    components: { EntDrawer, EntForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const orgId = ref(-1);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false, destroyOnClose: true });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          orgId.value = data.record.orgId;
          await setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          saveOrUpdateOrg({ ...values, orgId: orgId.value })
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
      };
    },
  });
</script>
