<template>
  <div :class="wrapClasses">
    <input
      :type="type"
      :class="inputClasses"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :readonly="readonly"
      :name="name"
      :value="currentValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keyup.enter="handleEnter"
    >
  </div>
</template>

<script>
import { oneOf } from '@/utils/assist.js'
import Emitter from '@/mixins/emitter.js'
const prefixCls = 'i-input'
export default {
  name: 'iInput',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      validator (value) {
        return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel'])
      },
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    number: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default: 'default'
    }
  },
  data () {
    return {
      currentValue: this.value,
      prefixCls
    }
  },
  computed: {
    wrapClasses () {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-${this.type}`]: !!this.size,
          [`${prefixCls}-type`]: this.type
        }
      ]
    },
    inputClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: this.disabled
        }
      ]
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

      this.$emit('on-change', event)
    },
    handleBlur (event) {
      this.$emit('on-blur', event)
      this.dispatch('iFormItem', 'on-form-blur', this.currentValue)
    },
    handleFocus (event) {
      this.$emit('on-focus', event)
    },
    handleEnter (event) {
      this.$emit('on-enter', event)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/input.scss";
</style>
