<template>
  <EntPageWrapper>
    <EntTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
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
      </template>
    </EntTable>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { EntTable, useTable, EntTableAction, BasicColumn } from 'fe-ent-core/lib/components';
  import { getLogsPage, removeSession } from '/@/api/system';
  import { EntPageWrapper } from 'fe-ent-core/lib/components';
  import { useMessage } from 'fe-ent-core/lib/hooks';
  export const columns: BasicColumn[] = [
    {
      title: '应用',
      dataIndex: 'appName',
      width: 50,
    },
    {
      title: '操作人账号',
      dataIndex: 'createUserName',
      width: 50,
    },
    {
      title: 'IP',
      dataIndex: 'clientIp',
      width: 50,
    },
    {
      title: '发生时间',
      dataIndex: 'createTime',
      width: 100,
    },
    {
      title: '日志名称',
      dataIndex: 'logName',
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
