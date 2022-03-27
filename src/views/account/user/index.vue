<template>
  <EntPageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <OrgTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <EntTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #action="{ record }">
        <EntTableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看用户详情',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </EntTable>
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { getUserPage } from '/@/api/user';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import OrgTree from './org-tree.vue';
  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import UserDrawer from './user-drawer.vue';

  import { columns, searchFormSchema } from './user-data';
  import { useGo } from 'fe-ent-core/lib/hooks/web/use-page';

  export default defineComponent({
    name: 'AccountManagement',
    components: { EntTable, EntPageWrapper, OrgTree, UserDrawer, EntTableAction },
    setup() {
      const go = useGo();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '账号列表',
        api: getUserPage,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }

      function handleSelect(orgId = '') {
        searchInfo.orgId = orgId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/system/account_detail/' + record.id);
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
      };
    },
  });
</script>