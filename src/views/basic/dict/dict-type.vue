<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <EntTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" size="small" @click="handleCreate"> 新增 </a-button>
        <a-button color="error" size="small" @click="handleDelete"> 删除 </a-button>
      </template>
    </EntTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { EntTable, useTable } from 'fe-ent-core/lib/components/table';
  import { getDictTypePage } from '/@/api/system';
  import { columns } from './dict-type-data';

  export default defineComponent({
    name: 'DictType',
    components: { EntTable },

    emits: ['select'],
    setup(_, { emit }) {
      const [registerTable, { reload, getSelectRows }] = useTable({
        title: '字典类型列表',
        api: getDictTypePage,
        columns,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        clickToRowSelect: true,
        size: 'small',
        rowKey: 'dictTypeId',
        rowSelection: {
          type: 'radio',
          onChange: handleSelect,
        },
      });

      function handleSelect() {
        const rows = getSelectRows();
        if (rows.length > 0) {
          emit('select', rows[0].dictTypeCode);
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
