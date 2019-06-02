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
    }
  },
  data () {
    return {
      prefixCls,
      show: true
    }
  },
  watch: {
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
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  }
}
</script>

<style>
</style>
