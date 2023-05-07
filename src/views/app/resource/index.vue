<template>
  <div>
    <EntTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <EntTableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看详情',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </EntTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { getResourcePageList } from '/@/api/resource';

  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import RoleDrawer from './resource-drawer.vue';

  import { columns, searchFormSchema } from './resource-data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { EntTable, RoleDrawer, EntTableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '资源列表',
        api: getResourcePageList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        rowKey: 'resourceId',
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
      });

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleEdit,
        handleSuccess,
      };
    },
  });
</script>
