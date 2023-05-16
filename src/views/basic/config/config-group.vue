<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <EntTable @register="registerTable">
      <template #toolbar>
        <ent-button type="primary" size="small" @click="handleCreate"> 新增 </ent-button>
        <ent-button color="error" size="small" @click="handleDelete"> 删除 </ent-button>
      </template>
    </EntTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable, useTable } from 'fe-ent-core/lib/components/table';
  import { getSysConfigGroupPage } from '/@/api/system';
  import { columns } from './group-data';
  import { Recordable } from 'fe-ent-core/es/types';

  export default defineComponent({
    name: 'OrgTree',
    components: { EntTable },

    emits: ['select'],
    setup(_, { emit }) {
      const [registerTable, { getSelectRows }] = useTable({
        title: '',
        api: getSysConfigGroupPage,
        columns,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        clickToRowSelect: true,
        size: 'small',
        rowKey: 'dictId',
        rowSelection: {
          type: 'radio',
          onChange: handleSelect,
        },
      });

      function handleSelect() {
        const rows = getSelectRows();
        if (rows.length > 0) {
          emit('select', rows[0].dictCode);
        } else {
          emit('select', '');
        }
      }

      function handleCreate() {}

      function handleDelete() {}

      function handleEdit(record: Recordable) {}

      return { registerTable, handleCreate, handleDelete, handleEdit, handleSelect };
    },
  });
</script>
