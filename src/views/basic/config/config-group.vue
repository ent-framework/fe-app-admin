<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <EntTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" size="small" @click="handleCreate"> 新增 </a-button>
        <a-button color="warning" size="small" @click="handleDelete"> 删除 </a-button>
      </template>
    </EntTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { EntTable, useTable, EntTableAction } from 'fe-ent-core/lib/components/table';
  import { getSysConfigGroupPage } from '/@/api/system';
  import { columns } from './group-data';

  export default defineComponent({
    name: 'OrgTree',
    components: { EntTable, EntTableAction },

    emits: ['select'],
    setup(_, { emit }) {
      const [registerTable, { reload, getSelectRows }] = useTable({
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
