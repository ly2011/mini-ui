<template>
  <div :class="classes" :name="name">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward, oneOf } from '@/utils/assist.js'
import Emitter from '@/mixins/emitter.js'

const prefixCls = 'i-radio-group'

let seed = 0
const now = Date.now()
const getUuid = () => `iRadioGroup_${now}_${seed++}`

export default {
  name: 'RadioGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      default: 'default',
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      }
    },
    type: {
      type: String,
      validator (value) {
        return oneOf(value, ['button'])
      }
    },
    name: {
      type: String,
      default: getUuid
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size
        }
      ]
    }
  },
  watch: {
    value () {
      if (this.currentValue !== this.value) {
        this.currentValue = this.value
        this.$nextTick(() => {
          this.updateValue()
        })
      }
    }
  },
  mounted () {
    this.updateValue()
  },
  methods: {
    updateValue () {
      this.childrens = findComponentsDownward(this, 'Radio')
      if (this.childrens) {
        this.childrens.forEach(child => {
          child.currentValue = this.currentValue === child.label
          child.group = true
        })
      }
    },
    change (data) {
      this.currentValue = data.value
      this.updateValue()
      this.$emit('input', data.value)
      this.$emit('on-change', data.value)
      this.dispatch('iFormItem', 'on-form-change', data.value)
    }
  }
}
</script>
