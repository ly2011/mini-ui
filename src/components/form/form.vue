<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>

export default {
  name: 'iForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  provide () {
    return {
      form: this
    }
  },
  data () {
    return {
      fields: [] // 缓存所有 form-item 的实例
    }
  },
  created () {
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field)
    })
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
    })
  },
  methods: {
    // 公开方法: 全部重置数据
    resetFields () {
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    // 公开方法: 全部校验数据, 支持 Promise
    validate (callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        // 如需要验证的fields为空,调用验证时立刻返回callback
        if (this.fields.length === 0 && callback) {
          callback(true)
        }
        let invalidFields = {}
        this.fields.forEach(field => {
          field.validate('', (message, field) => {
            if (message) {
              valid = false
            }
            invalidFields = Object.assign({}, invalidFields, field)
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid, invalidFields)
              }
            }
          })
        })
      })
    }
  }
}
</script>

<style>
</style>
