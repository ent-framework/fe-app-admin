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
    {
      title: '请求地址',
      dataIndex: 'requestUrl',
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
