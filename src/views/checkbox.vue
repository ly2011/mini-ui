<template>
  <div>
    <h3>组合多选框组件——CheckboxGroup & Checkbox</h3>
    <i-checkbox v-model="single" @on-change="handleSingleChange" true-value="Y" false-value="N">单独选项</i-checkbox>
  </div>
</template>

<script>
import iCheckbox from '@/components/checkbox/checkbox.vue'
export default {
  components: {
    iCheckbox
  },
  data () {
    return {
      single: false
    }
  },
  methods: {
    handleSingleChange (value) {
      console.log('handleSingleChange: ', value)
    }
  }
}
</script>

<style>
</style>
