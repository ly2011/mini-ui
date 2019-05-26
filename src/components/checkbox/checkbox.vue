<template>
  <label>
    <span>
      <input v-if="group" type="checkbox" :disabled="disabled" :value="label" v-model="model" @change="change">
      <input v-else type="checkbox" :disabled="disabled" :checked="currentValue" @change="change">
    </span>
    <slot></slot>
  </label>
</template>

<script>
import { findComponentUpward } from '@/utils/assist.js'
import Emitter from '@/mixins/emitter.js'
export default {
  name: 'iCheckbox',
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: { // 只会在组合使用时有效，结合 model 来使用
      type: [String, Number, Boolean]
    }
  },
  data () {
    return {
      currentValue: this.value,
      model: [], // 缓存父级 CheckboxGroup 的 value
      group: false, // 是否用了 CheckboxGroup 组件
      parent: null
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        throw 'Value should be trueValue or falseValue'
      }
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'iCheckboxGroup')
    if (this.parent) this.group = true

    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  },
  methods: {
    change (event) {
      if (this.disabled) {
        return false
      }

      const checked = event.target.checked
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)
      if (this.group) { // 在组合模式下，Checkbox选中，就不用对Form派发事件了，应该在 CheckboxGroup 中派发
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('iFormItem', 'on-form-change', value)
      }
    },
    updateModel () {
      this.currentValue = this.value === this.trueValue
    }
  }
}
</script>
