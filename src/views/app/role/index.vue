<template>
  <div>
    <EntTable @register="registerTable">
      <template #toolbar>
        <ent-button type="primary" @click="handleCreate"> 新增角色 </ent-button>
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
                icon: 'ant-design:menu-unfold-outlined',
                label: '菜单授权',
                onClick: handleGrantMenu.bind(null, record),
              },
              {
                icon: 'ant-design:security-scan-outlined',
                label: '数据权限',
                onClick: handleGrantOrg.bind(null, record),
              },
              {
                icon: 'ant-design:api-twotone',
                label: '资源授权',
                onClick: handleGrantRes.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </EntTable>
    <RoleDrawer @register="registerRoleDrawer" @success="handleSuccess" />
    <GrantMenuDrawer @register="registerGrantMenuDrawer" />
    <GrantOrgDrawer @register="registerGrantOrgDrawer" @success="handleSuccess" />
    <GrantResDrawer @register="registerGrantResDrawer" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { getRoleListByPage } from '/@/api/role';
  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import RoleDrawer from './role-drawer.vue';
  import GrantMenuDrawer from './grant-menu-drawer.vue';
  import GrantOrgDrawer from './grant-org-drawer.vue';
  import GrantResDrawer from './grant-resource-drawer.vue';
  import { columns, searchFormSchema } from './role-data';

  export default defineComponent({
    name: 'RoleManagement',
    components: {
      EntTable,
      RoleDrawer,
      EntTableAction,
      GrantMenuDrawer,
      GrantOrgDrawer,
      GrantResDrawer,
    },
    setup() {
      const [registerRoleDrawer, { openDrawer: openRoleEditorDrawer }] = useDrawer();
      const [registerGrantMenuDrawer, { openDrawer: openGrantMenuDrawer }] = useDrawer();
      const [registerGrantOrgDrawer, { openDrawer: openGrantOrgDrawer }] = useDrawer();
      const [registerGrantResDrawer, { openDrawer: openGrantResDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: getRoleListByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        rowKey: 'roleId',
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 180,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
      });

      function handleCreate() {
        openRoleEditorDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openRoleEditorDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleGrantMenu(record: Recordable) {
        openGrantMenuDrawer(true, {
          record,
        });
      }

      function handleGrantOrg(record: Recordable) {
        openGrantOrgDrawer(true, {
          record,
        });
      }

      function handleGrantRes(record: Recordable) {
        openGrantResDrawer(true, {
          record,
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
        registerRoleDrawer,
        registerGrantMenuDrawer,
        registerGrantOrgDrawer,
        registerGrantResDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleGrantMenu,
        handleGrantOrg,
        handleGrantRes,
      };
    },
  });
</script>
