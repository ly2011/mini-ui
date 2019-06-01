<template>
  <label :class="wrapClasses">
    <span :class="radioClasses">
      <span :class="innerClasses"></span>
      <input
        type="radio"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="groupName"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
    </span>
    <slot>{{label}}</slot>
  </label>
</template>

<script>
import { findComponentUpward, oneOf } from '@/utils/assist.js'
import Emitter from '@/mixins/emitter.js'

const prefixCls = 'i-radio'

export default {
  name: 'Radio',
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
    },
    size: {
      type: String,
      default: 'default',
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      }
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      currentValue: this.value,
      groupName: this.name || '222',
      group: false, // 是否用了 CheckboxGroup 组件
      parent: null,
      focusWrapper: false,
      focusInner: false
    }
  },
  computed: {
    wrapClasses () {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-group-item`]: this.group,
          [`${prefixCls}-wrapper-checked`]: this.currentValue,
          [`${prefixCls}-wrapper-disabled`]: this.disabled,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-focus`]: this.focusWrapper
        }
      ]
    },
    radioClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue,
          [`${prefixCls}-disabled`]: this.disabled
        }
      ]
    },
    innerClasses () {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-focus`]: this.focusInner
        }
      ]
    },
    inputClasses () {
      return `${prefixCls}-input`
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateValue()
      } else {
        throw 'Value should be trueValue or falseValue'
      }
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'RadioGroup')
    if (this.parent) {
      this.group = true
      if (this.name && this.name !== this.parent.name) {
        console.warn('Name does not match Radio Group name.')
      } else {
        this.groupName = this.parent.name
        // console.log('我进来了', this.parent.name, this.groupName)
      }
    }

    if (this.group) {
      this.parent.updateValue()
    } else {
      this.updateValue()
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
      if (this.group) { // 在组合模式下，Radio选中，就不用对Form派发事件了，应该在 CheckboxGroup 中派发
        if (this.label !== undefined) {
          this.parent.change({
            value: this.label,
            checked: this.value
          })
        }
      } else {
        this.$emit('on-change', value)
        this.dispatch('iFormItem', 'on-form-change', value)
      }
    },
    updateValue () {
      this.currentValue = this.value === this.trueValue
    },
    onBlur () {
      this.focusWrapper = false
      this.focusInner = false
    },
    onFocus () {
      if (this.group && this.parent.type === 'button') {
        this.focusWrapper = true
      } else {
        this.focusInner = true
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/radio.scss";
</style>
