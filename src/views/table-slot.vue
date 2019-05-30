<template>
  <div>
    <table-slot :columns="columns" :data="data">
      <template slot="name" slot-scope="{row, rowIndex}">
        <input v-if="editIndex === rowIndex" type="text" v-model="editName">
        <span v-else>{{ row.name }}</span>
      </template>
      <template slot="age" slot-scope="{row, rowIndex}">
        <input v-if="editIndex === rowIndex" type="text" v-model="editAge">
        <span v-else>{{ row.age }}</span>
      </template>
      <template slot="birthday" slot-scope="{row, rowIndex}">
        <input v-if="editIndex === rowIndex" type="text" v-model="editBirthday">
        <span v-else>{{ row.birthday }}</span>
      </template>
      <template slot="address" slot-scope="{row, rowIndex}">
        <input v-if="editIndex === rowIndex" type="text" v-model="editAddress">
        <span v-else>{{ row.address }}</span>
      </template>
      <template slot="action" slot-scope="{row, rowIndex}">
        <div v-if="editIndex === rowIndex">
          <button @click="handleSave(rowIndex)">保存</button>
          <button @click="editIndex = -1">取消</button>
        </div>
        <div v-else>
          <button @click="handleEdit(row, rowIndex)">操作</button>
        </div>
      </template>
    </table-slot>
  </div>
</template>

<script>
import TableSlot from '@/components/table-slot/table.vue'
export default {
  components: {
    TableSlot
  },
  data () {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
          slot: 'name'
        },
        {
          title: '年龄',
          key: 'age',
          slot: 'age'
        },
        {
          title: '出生日期',
          key: 'birthday',
          slot: 'birthday'
        },
        {
          title: '地址',
          key: 'address',
          slot: 'address'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数，当点击修改按钮时，再将它置为正确的行号
      editName: '', // 第一列输入框
      editAge: '', // 第二列输入框
      editBirthday: '', // 第三列输入框
      editAddress: '' // 第四列输入框
    }
  },
  methods: {
    handleEdit (row, index) {
      this.editName = row.name
      this.editAge = row.age
      this.editBirthday = row.birthday
      this.editAddress = row.address
    }
  }
}
</script>

<style>
</style>
