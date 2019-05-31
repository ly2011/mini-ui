<template>
  <ul class="tree-ul">
    <li class="tree-li">
      <!-- expand -->
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand">+</span>
        <span v-if="data.children && data.children.length && data.expand">+</span>
      </span>
      <i-checkbox v-if="showCheckbox" :value="data.checked" @input="handleCheck"></i-checkbox>
      <span>{{data.title}}</span>
      <!-- 递归子节点, v-if="data.expand": 用来判断当前节点的`子节点`是否展开(渲染) -->
      <template v-for="(item, index) in data.children">
        <tree-node v-if="data.expand" :key="index" :data="item" :show-checkbox="showCheckbox"></tree-node>
      </template>
    </li>
  </ul>
</template>

<script>
import iCheckbox from '@/components/checkbox/checkbox.vue'
import { findComponentUpward } from '@/utils/assist.js'
export default {
  name: 'TreeNode',
  components: {
    iCheckbox
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tree: findComponentUpward(this, 'Tree')
    }
  },
  watch: {
    'data.children': {
      deep: true,
      handler (data) {
        if (data) {
          const checkAll = data.every(item => item.checked)
          this.$set(this.data, 'checked', checkAll)
        }
      }
    }
  },
  methods: {
    handleExpand () {
      this.$set(this.data, 'expand', !this.data.expand)

      if (this.tree) {
        this.tree.emitEvent('on-toggle-expand', this.data)
      }
    },
    handleCheck (checked) {
      this.updateTreeDown(this.data, checked)

      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.data)
      }
    },
    updateTreeDown (data, checked) {
      this.$set(data, 'checked', checked)

      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, checked)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.tree-ul,
.tree-li {
  list-style: none;
  padding-left: 10px;
}
.tree-expand {
  cursor: pointer;
}
</style>
