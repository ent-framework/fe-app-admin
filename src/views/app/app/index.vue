<template>
  <div>
    <EntTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #action="{ record }">
        <EntTableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </EntTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { getAppPage } from '/@/api/app';

  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import RoleDrawer from './app-drawer.vue';

  import { columns, searchFormSchema } from './app-data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { EntTable, RoleDrawer, EntTableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '应用列表',
        api: getAppPage,
        columns,
        rowKey: 'appId',
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
