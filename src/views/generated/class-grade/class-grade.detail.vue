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
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { formSchema } from './class-grade.data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { CreateClassGrade, UpdateClassGrade } from '/@/generated/api/class-grade';

  export default defineComponent({
    name: 'ClassGradeDrawer',
    components: { EntDrawer, EntForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const mode = ref('c');
      const { createMessage } = useMessage();
      const id = ref(null);
      const [registerForm, { resetFields, setFieldsValue, validate, setProps }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false, destroyOnClose: true });
        mode.value = data?.edit_mode;

        if (unref(mode) === 'u' || unref(mode) === 'r') {
          id.value = data.record.id;
          await setFieldsValue({
            ...data.record,
          });
          if (unref(mode) === 'r') {
            await setProps({ disabled: true });
          } else {
            await setProps({ disabled: false });
          }
        }
      });

      const getTitle = computed(() => {
        const v = unref(mode);
        switch (v) {
          case 'c':
            return '新增班级';
          case 'u':
            return '编辑班级';
          case 'r':
            return '查看班级';
        }
        return '';
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (unref(mode) == 'u') {
            UpdateClassGrade({ ...values, id: id.value })
              .then(() => {
                createMessage.success(`保存成功`);
                closeDrawer();
                emit('success');
              })
              .catch();
          } else if (unref(mode) == 'c') {
            CreateClassGrade({ ...values, id: null })
              .then(() => {
                createMessage.success(`保存成功`);
                closeDrawer();
                emit('success');
              })
              .catch();
          }
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
