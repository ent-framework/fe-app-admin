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
  import { getOnlineUserList, removeSession } from '/@/api/system';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  export const columns: BasicColumn[] = [
    {
      title: '账号',
      dataIndex: 'account',
      width: 100,
      align: 'left',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 100,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      width: 50,
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      width: 180,
    },
  ];

  export default defineComponent({
    name: 'OnlineUserList',
    components: { EntTable, EntTableAction, EntPageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: '在线用户',
        api: getOnlineUserList,
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
