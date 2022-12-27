<template>
  <EntDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="资源权限"
    width="500px"
    @ok="handleSubmit"
  >
    <EntForm @register="registerForm">
      <template #resource="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="resourceData"
          :fieldNames="{ title: 'nodeName', key: 'code' }"
          :checked-keys="checkedKeys"
          checkable
          toolbar
          title="选择资源"
        />
      </template>
    </EntForm>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { grantResourceFormSchema } from './role-data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  import { BasicTree, TreeItem } from 'fe-ent-core/lib/components/tree';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { grantRoleResource, getRoleSelectedResource, getRoleResourceTree } from '/@/api/role';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { EntDrawer, EntForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const resourceData = ref<TreeItem[]>([]);
      const { createMessage } = useMessage();
      const roleId = ref(null);
      const checkedKeys = ref<string[]>([]);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: grantResourceFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false, destroyOnClose: true });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        roleId.value = data.record.roleId;
        resourceData.value = (await getRoleResourceTree()) as any as TreeItem[];

        checkedKeys.value = (await getRoleSelectedResource({
          roleId: data.record.roleId,
        })) as any as string[];

        await setFieldsValue({
          ...data.record,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          grantRoleResource({ ...values, roleId: roleId.value })
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
        resourceData,
        checkedKeys,
      };
    },
  });
</script>
