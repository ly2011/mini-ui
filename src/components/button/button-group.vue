<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from '@/utils/assist.js'

const prefixCls = 'i-btn-group'

export default {
  name: 'ButtonGroup',
  props: {
    size: {
      type: String,
      default: 'default',
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      }
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-vertical`]: this.vertical
        }
      ]
    }
  }
}
</script>

<style>
</style>
