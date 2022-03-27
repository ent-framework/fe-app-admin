<template>
  <EntDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    width="500px"
    @ok="handleSubmit"
    title="菜单分配"
  >
    <EntForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :replaceFields="{ title: 'menuName', key: 'menuId' }"
          :checked-keys="checkedKeys"
          checkable
          @check="onCheckNode"
          toolbar
          title="选择菜单"
        />
      </template>
    </EntForm>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { grantMenuFormSchema } from './role-data';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  import { BasicTree, TreeItem } from 'fe-ent-core/lib/components/tree';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { grantMenu, getRoleMenus } from '/@/api/role';
  import { getMenuList } from '/@/api/menu';
  import { CheckKeys } from 'fe-ent-core/lib/components/tree';
  import { CheckEvent } from 'ant-design-vue/lib/tree/Tree';

  export default defineComponent({
    name: 'GrantMenuDrawer',
    components: { EntDrawer, EntForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const checkedKeys = ref<CheckKeys>({ checked: [], halfChecked: [] });
      const { createMessage } = useMessage();
      const roleId = ref(null);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: grantMenuFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false, destroyOnClose: true });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        roleId.value = data.record.roleId;
        treeData.value = (await getMenuList()) as any as TreeItem[];
        checkedKeys.value = await getRoleMenus({
          roleId: data.record.roleId,
        });

        await setFieldsValue({
          ...data.record,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          grantMenu({ ...values, grantMenuIdList: checkedKeys.value, roleId: roleId.value })
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

      // 特殊的事件监听，要获取树的半选中状态
      function onCheckNode(chkKeys: CheckKeys, event: CheckEvent) {
        checkedKeys.value = {
          checked: chkKeys,
          halfChecked: event.halfCheckedKeys,
        };
      }

      return {
        registerDrawer,
        registerForm,
        handleSubmit,
        treeData,
        checkedKeys,
        onCheckNode,
      };
    },
  });
</script>
