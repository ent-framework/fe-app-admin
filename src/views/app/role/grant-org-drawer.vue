<template>
  <EntDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="数据权限"
    width="500px"
    @ok="handleSubmit"
  >
    <EntForm @register="registerForm">
      <template #org="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="orgData"
          :replaceFields="{ title: 'name', key: 'id' }"
          :checked-keys="checkedKeys"
          checkable
          toolbar
          title="选择组织"
        />
      </template>
    </EntForm>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { grantOrgFormSchema } from './role-data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  import { BasicTree, TreeItem } from 'fe-ent-core/lib/components/tree';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { grantDataScope, getRoleDataScopes } from '/@/api/role';
  import { getOrgTree } from '/@/api/org';

  export default defineComponent({
    name: 'GrantOrgDrawer',
    components: { EntDrawer, EntForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const orgData = ref<TreeItem[]>([]);
      const { createMessage } = useMessage();
      const roleId = ref(null);
      const checkedKeys = ref<number[]>([]);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: grantOrgFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false, destroyOnClose: true });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        orgData.value = (await getOrgTree()) as any as TreeItem[];
        checkedKeys.value = (await getRoleDataScopes({
          roleId: data.record.roleId,
        })) as any as number[];
        roleId.value = data.record.roleId;

        await setFieldsValue({
          ...data.record,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          grantDataScope({ ...values, roleId: roleId.value })
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
        orgData,
        checkedKeys,
      };
    },
  });
</script>
