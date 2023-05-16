<template>
  <EntPageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <LanguageGroup class="w-1/3 xl:w-1/4" @select="handleSelect" />
    <EntTable @register="registerTable" class="w-2/3 xl:w-3/4" :searchInfo="searchInfo">
      <template #toolbar>
        <ent-button type="primary" @click="handleCreate">新增配置</ent-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <EntTableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑配置',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此配置',
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
    <LanguageDrawer @register="registerDrawer" @success="handleSuccess" />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { getLanguagePage } from '/@/api/system';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import LanguageGroup from './language-group.vue';
  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import LanguageDrawer from './language-drawer.vue';

  import { columns, searchFormSchema } from './language-data';

  export default defineComponent({
    name: 'ConfigManagement',
    components: { EntTable, EntPageWrapper, LanguageGroup, LanguageDrawer, EntTableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '账号列表',
        api: getLanguagePage,
        rowKey: 'configId',
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

      function handleSelect(tranLanguageCode = '') {
        searchInfo.tranLanguageCode = tranLanguageCode;
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        searchInfo,
      };
    },
  });
</script>
