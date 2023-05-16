<template>
  <EntPageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <OrgTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <EntTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <ent-button type="primary" @click="handleCreate">新增账号</ent-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <EntTableAction
            :actions="[
              /*            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看用户详情',
              onClick: handleView.bind(null, record),
            },*/
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
            :dropDownActions="[
              {
                icon: 'ant-design:api-twotone',
                label: '分配角色',
                onClick: handleBindRoles.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </EntTable>
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
    <GrantRoleDrawer @register="registerGrantRoleDrawer" />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { getUserPage, deleteUser } from '/@/api/user';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import OrgTree from './org-tree.vue';
  import GrantRoleDrawer from './grant-role-drawer.vue';
  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import UserDrawer from './user-drawer.vue';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { columns, searchFormSchema } from './user-data';
  import { useGo } from 'fe-ent-core/lib/hooks/web/use-page';

  export default defineComponent({
    name: 'AccountManagement',
    components: { EntTable, EntPageWrapper, OrgTree, UserDrawer, EntTableAction, GrantRoleDrawer },
    setup() {
      const go = useGo();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerGrantRoleDrawer, { openDrawer: openGrantRoleDrawer }] = useDrawer();
      const searchInfo = reactive<Recordable>({});
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        api: getUserPage,
        rowKey: 'userId',
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
        deleteUser(record)
          .catch()
          .then(() => {
            createMessage.success(`删除成功`);
            reload();
          });
      }

      function handleSuccess() {
        reload();
      }

      function handleSelect(orgId) {
        searchInfo.orgId = orgId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/system/account_detail/' + record.id);
      }

      function handleBindRoles(record: Recordable) {
        openGrantRoleDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      return {
        registerTable,
        registerDrawer,
        registerGrantRoleDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        handleBindRoles,
        searchInfo,
      };
    },
  });
</script>
