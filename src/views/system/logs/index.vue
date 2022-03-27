<template>
  <EntPageWrapper>
    <EntTable @register="registerTable">
      <template #action="{ record }">
        <EntTableAction
          :actions="[
            {
              icon: 'ant-design:arrow-down-outlined',
              color: 'error',
              popConfirm: {
                title: '是否强制下线',
                confirm: handleRemoveSession.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </EntTable>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import {
    EntTable,
    useTable,
    EntTableAction,
    BasicColumn,
  } from 'fe-ent-core/lib/components/table';
  import { getLogsPage, removeSession } from '/@/api/system';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  export const columns: BasicColumn[] = [
    {
      title: '登录姓名',
      dataIndex: 'userName',
      width: 50,
    },
    {
      title: 'IP',
      dataIndex: 'llgIpAddress',
      width: 100,
    },
    {
      title: '登录时间',
      dataIndex: 'createTime',
      width: 180,
    },
    {
      title: '日志名称',
      dataIndex: 'llgName',
      width: 100,
      align: 'left',
    },
    {
      title: '是否成功',
      dataIndex: 'llgSucceed',
      width: 100,
    },
    {
      title: '消息',
      dataIndex: 'llgMessage',
      width: 100,
    },
  ];

  export default defineComponent({
    name: 'LogsList',
    components: { EntTable, EntTableAction, EntPageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: '日志管理',
        api: getLogsPage,
        columns,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleRemoveSession(record: Recordable) {
        removeSession({ ...record }).then(() => {
          createMessage.success(`操作成功`);
          reload();
        });
      }

      return {
        registerTable,
        handleRemoveSession,
      };
    },
  });
</script>
