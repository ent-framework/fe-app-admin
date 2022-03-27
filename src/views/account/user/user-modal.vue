<template>
  <EntModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <EntForm @register="registerForm" />
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { EntModal, useModalInner } from 'fe-ent-core/lib/components/modal';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { accountFormSchema } from './user-data';
  import { getPositionList } from '/@/api/position';

  export default defineComponent({
    name: 'UserModal',
    components: { EntModal, EntForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          await setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getPositionList();
        await updateSchema([
          {
            field: 'pwd',
            show: !unref(isUpdate),
          },
          {
            field: 'positionId',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
