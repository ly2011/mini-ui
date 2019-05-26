<template>
  <input type="text" :value="currentValue" @input="handleInput" @blur="handleBlur">
</template>

<script>
import Emitter from '@/mixins/emitter.js'
export default {
  name: 'iInput',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    handleInput (event) {
      const value = event.target.value
      this.currentValue = value
      this.$emit('input', value) // input时间与prop value 构成双向绑定
      this.dispatch('iFormItem', 'on-form-change', value) // 有值改变，则通知form-item组件去校验
    },
    handleBlur () {
      this.dispatch('iFormItem', 'on-form-blur', this.currentValue)
    }
  }
}
</script>

<style>
</style>
