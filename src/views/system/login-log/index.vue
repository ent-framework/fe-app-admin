<template>
  <EntPageWrapper>
    <EntTable @register="registerTable" />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { EntTable, useTable, BasicColumn } from 'fe-ent-core/lib/components/table';
  import { getLoginLogsPage, removeSession } from '/@/api/system';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { Recordable } from 'fe-ent-core/es/types';
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
    name: 'LoginLogsList',
    components: { EntTable, EntPageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: '登录日志',
        api: getLoginLogsPage,
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
