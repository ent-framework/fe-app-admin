<template>
  <div>
    <EntTable
      @register="registerTable"
      :searchInfo="searchInfo"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #headerTop>
        <Alert type="info" show-icon>
          <template #message>
            <template v-if="checkedKeys.length > 0">
              <span>已选中{{ checkedKeys.length }}条记录(可跨页)</span>
              <ent-button type="link" @click="checkedKeys = []" size="small">清空</ent-button>
            </template>
            <template v-else>
              <span>未选中任何记录</span>
            </template>
          </template>
        </Alert>
      </template>
      <template #toolbar>
        <Popconfirm
          title="确认删除所选记录?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleBatchDelete"
        >
          <ent-button type="primary" danger :disabled="checkedKeys.length === 0">删除</ent-button>
        </Popconfirm>
        <ent-button type="primary" @click="handleCreate">新增考试记录</ent-button>
      </template>
      <template #action="{ record }">
        <EntTableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看考试记录详情',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑考试记录资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此考试记录',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </EntTable>
    <HistoryScoreDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';

  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import {
    HistoryScorePage,
    HistoryScoreDeleteById,
    HistoryScoreBatchDelete,
  } from '/@/generated/api/history-score';
  import { useDrawer } from 'fe-ent-core/lib/components/drawer';
  import HistoryScoreDrawer from './history-score.detail.vue';

  import { columns, searchFormSchema } from './history-score.data';
  import { Alert, Popconfirm } from 'ant-design-vue';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';

  export default defineComponent({
    name: 'HistoryScoreManagement',
    components: { EntTable, HistoryScoreDrawer, EntTableAction, Alert, Popconfirm },
    setup() {
      const { createMessage } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const checkedKeys = ref<Array<string | number>>([]);
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        title: '考试记录列表',
        api: HistoryScorePage,
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
          edit_mode: 'c',
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          edit_mode: 'u',
        });
      }

      function handleDelete(record: Recordable) {
        HistoryScoreDeleteById(record).then(() => {
          createMessage.success(`删除成功`);
          reload();
        });
      }

      function handleSuccess() {
        //刷新表格直接更新内部数据。
        reload();
      }

      function handleView(record: Recordable) {
        openDrawer(true, {
          record,
          edit_mode: 'r',
        });
      }

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }

      function handleBatchDelete() {
        const records = { ids: checkedKeys.value };
        HistoryScoreBatchDelete(records).then(() => {
          createMessage.success(`删除成功`);
          checkedKeys.value = [];
          reload();
        });
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleView,
        searchInfo,
        checkedKeys,
        onSelectChange,
        handleBatchDelete,
      };
    },
  });
</script>
