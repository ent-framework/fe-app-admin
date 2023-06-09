<template>
  <div>
    <EntTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <ent-button type="primary" @click="handleCreate"> 新增菜单 </ent-button>
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
            :dropDownActions="[
              {
                icon: 'ant-design:api-twotone',
                label: '挂载资源',
                onClick: handleBindRes.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </EntTable>
    <MenuDrawer @register="registerMenuDrawer" @success="handleSuccess" />
    <ResourceDrawer @register="registerResourceDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { getMenuList } from '/@/api/menu';

  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import MenuDrawer from './menu-drawer.vue';
  import ResourceDrawer from './resource-drawer.vue';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { columns, searchFormSchema } from './menu-data';

  export default defineComponent({
    name: 'MenuManagement',
    components: { EntTable, EntTableAction, MenuDrawer, ResourceDrawer },
    setup() {
      const { createMessage } = useMessage();
      const [registerMenuDrawer, { openDrawer: openMenuDrawer }] = useDrawer();
      const [registerResourceDrawer, { openDrawer: openResourceDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '菜单列表',
        api: getMenuList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        rowKey: 'menuId',
        canResize: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
      });

      function handleCreate() {
        openMenuDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openMenuDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleBindRes(record: Recordable) {
        const menuType = record.menuType;
        if (menuType != 2) {
          openResourceDrawer(true, {
            record,
            isUpdate: true,
          });
        } else {
          createMessage.warning('外部链接不能挂载资源');
        }
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      return {
        registerTable,
        registerMenuDrawer,
        registerResourceDrawer,
        handleCreate,
        handleEdit,
        handleBindRes,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
