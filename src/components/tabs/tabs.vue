<template>
  <div :class="wrapClasses">
    <div :class="[prefixCls + '-bar']">
      <div :class="[prefixCls + '-nav-container']">
        <div :class="[prefixCls + '-nav-wrap']">
          <div :class="[prefixCls + '-nav-scroll']">
            <div :class="[prefixCls + '-nav']" ref="nav">
              <div :class="barClasses" :style="barStyle"></div>
              <div v-for="(item, index) in navList" :key="index" @click="handleChange(index)" :class="tabCls(item)">{{item.label}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="contentClasses" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { oneOf, getStyle } from '@/utils/assist.js'
const prefixCls = 'i-tabs'
export default {
  name: 'Tabs',
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      default: 'line'
    },
    size: {
      type: String,
      default: 'default'
    },
    animated: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls,
      navList: [],
      name: this.value,
      barWidth: 0,
      barOffset: 0
    }
  },
  computed: {
    wrapClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-card`]: this.type === 'card',
          [`${prefixCls}-mini`]: this.size === 'small' && this.type === 'line',
          [`${prefixCls}-no-animation`]: !this.animated
        }
      ]
    },
    contentClasses () {
      return [
        `${prefixCls}-content`,
        {
        }
      ]
    },
    barClasses () {
      return [
        `${prefixCls}-ink-bar`
      ]
    },
    contentStyle () {
      const x = this.navList.findIndex(nav => nav.name === this.name)
      const p = x === 0 ? '0%' : `-${x}00%`

      let style = {}
      if (x > -1) {
        style = {
          transform: `translateX(${p}) translateZ(0px)`
        }
      }
      return style
    },
    barStyle () {
      let style = {
        display: 'none',
        width: `${this.barWidth}px`
      }
      if (this.type === 'line') style.display = 'block'
      style.left = `${this.barOffset}px`

      return style
    }
  },
  watch: {
    value (val) {
      this.name = val
    },
    name (val) {
      this.updateBar()
      this.updateStatus()
    }
  },
  methods: {
    getTabs () {
      return this.$children.filter(item => item.$options.name === 'TabPane')
    },
    updateNav () {
      this.navList = []
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          icon: pane.icon || '',
          name: pane.name || index,
          disabled: pane.disabled,
          closable: pane.closable
        })
        if (!pane.name) pane.name = index
        if (index === 0) {
          // 如果Tabs不存在name时，设置第一个TabPane的name为选中状态
          if (!this.name) this.name = pane.name || index
        }
      })
      this.updateStatus()
      this.updateBar()
    },
    updateBar () {
      this.$nextTick(() => {
        const index = this.navList.findIndex((nav) => nav.name === this.name)
        const preTabs = this.$refs.nav.querySelectorAll(`.${prefixCls}-tab`)
        const tab = preTabs[index]
        this.barWidth = parseFloat(getStyle(tab, 'width'))

        if (index > 0) {
          let offset = 0
          const gutter = this.size === 'small' ? 0 : 16
          for (let i = 0; i < index; i++) {
            offset += parseFloat(getStyle(preTabs[i], 'width')) + gutter
          }

          this.barOffset = offset
        } else {
          this.barOffset = 0
        }
      })
    },
    updateStatus () {
      const tabs = this.getTabs()
      tabs.forEach(tab => { tab.show = (tab.name === this.name) })
    },
    tabCls (item) {
      return [
        `${prefixCls}-tab`,
        {
          [`${prefixCls}-tab-disabled`]: item.disabled,
          [`${prefixCls}-tab-active`]: item.name === this.name
        }
      ]
    },
    handleChange (index) {
      const nav = this.navList[index]
      if (nav.disabled) return
      this.$emit('input', nav.name)
      this.$emit('tab-click', nav.name)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/tabs.scss";
</style>
