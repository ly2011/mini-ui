<template>
  <div :class="prefixCls" v-show="show">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'i-tabs-tabpane'
export default {
  name: 'TabPane',
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    // 在 TabPane 使用 v-if 时，并不会按照预先的顺序渲染，这时可设置 index，并从小到大排序
    // 数值需大于 0
    index: {
      type: Number
    }
  },
  data () {
    return {
      prefixCls,
      show: true
    }
  },
  watch: {
    name (val) {
      this.updateNav()
    },
    label () {
      this.updateNav()
    },
    disabled () {
      this.updateNav()
    }
  },
  mounted () {
    this.updateNav()
  },
  destroyed () {
    this.updateNav()
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  }
}
</script>

<style>
</style>
