<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col, columnIndex) in columns" :key="rowIndex + '_' + columnIndex">
          <template v-if="'render' in col">
            <table-render :row="row" :column="col" :row-index="rowIndex" :column-index="columnIndex" :render="col.render"/>
          </template>
          <template v-else>{{ row[col.key] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import TableRender from './render.js'
export default {
  components: { TableRender },
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;

  th {
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }

  th,
  td {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
}
</style>
