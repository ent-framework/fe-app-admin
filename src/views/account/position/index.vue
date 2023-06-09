<template>
  <div>
    <EntTable @register="registerTable">
      <template #toolbar>
        <ent-button type="primary" @click="handleCreate"> 新增职位 </ent-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
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
      </template>
    </EntTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { positionPageQuery, positionDelete } from '/@/api/position';
  import { PositionItem } from '/@/model/position-model';
  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import RoleDrawer from './position-drawer.vue';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { columns, searchFormSchema } from './position-data';

  export default defineComponent({
    name: 'PositionManagement',
    components: { EntTable, RoleDrawer, EntTableAction },
    setup() {
      const { createMessage } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '职位列表',
        api: positionPageQuery,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
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
        positionDelete({
          ...(record as PositionItem),
        })
          .then(() => {
            createMessage.success(`操作成功`);
            reload();
          })
          .catch();
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
