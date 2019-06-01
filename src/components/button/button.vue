<template>
  <button :class="classes" :disabled="buttonDisabled || loading" :type="nativeType" @click="handleClick">
    <i class="i-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="showSlot" ref="slot">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import { oneOf } from '@/utils/assist.js'
const prefixCls = 'i-btn'
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return oneOf(value, ['primary', 'success', 'warning', 'error', 'info', 'text', 'default'])
      }
    },
    size: {
      type: String,
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      }
    },
    loading: Boolean,
    disabled: Boolean,
    nativeType: {
      type: String,
      default: 'button',
      validator (value) {
        return oneOf(value, ['button', 'submit', 'reset'])
      }
    },
    icon: String
  },
  inject: {
    form: {
      default: ''
    }
  },
  data () {
    return {
      showSlot: true
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-${this.buttonSize}`]: !!this.buttonSize,
          [`${prefixCls}-loading`]: !!this.loading,
          [`${prefixCls}-disabled`]: !!this.buttonDisabled
        }
      ]
    },
    buttonSize () {
      return this.size || (this.form || {}).size
    },
    buttonDisabled () {
      return this.disabled || (this.form || {}).disabled
    }
  },
  mounted () {
    this.showSlot = this.$slots.default !== undefined
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/button.scss";
</style>
