<template>
  <div :class="wrapClasses">
    <div :class="[prefixCls + '-bar']">
      <div :class="[prefixCls + '-nav-container']" ref="navContainer">
        <div :class="[prefixCls + '-nav-wrap']" ref="navWrap">
          <div :class="[prefixCls + '-nav-scroll']" ref="navScroll">
            <div :class="[prefixCls + '-nav']" ref="nav">
              <!-- 下拉 -->
              <div :class="barClasses" :style="barStyle"></div>
              <div v-for="(item, index) in navList" :key="index" @click="handleChange(index)" :class="tabCls(item)">
                <Render v-if="item.labelType === 'function'" :render="item.label"></Render>
                <template>{{item.label}}</template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="contentClasses" :style="contentStyle" ref="panes">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { oneOf, findComponentsDownward } from '@/utils/assist.js'
import Render from './render.js'
const prefixCls = 'i-tabs'
export default {
  name: 'Tabs',
  components: {
    Render
  },
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      default: 'line'
    },
    size: {
      type: String,
      default: 'default',
      validator (value) {
        return oneOf(value, ['small', 'default'])
      }
    },
    animated: {
      type: Boolean,
      default: false
    },
    beforeRemove: Function
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
          [`${prefixCls}-content-animated`]: this.animated
        }
      ]
    },
    barClasses () {
      return [
        `${prefixCls}-ink-bar`,
        {
          [`${prefixCls}-ink-bar-animated`]: this.animated
        }
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
      if (this.animated) {
        style.transform = `translate(${this.barOffset}px, 0px)`
      } else { style.left = `${this.barOffset}px` }

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
      // return this.$children.filter(item => item.$options.name === 'TabPane')
      const AllTabPanes = findComponentsDownward(this, 'TabPane')
      const TabPanes = []

      AllTabPanes.forEach(item => {
        TabPanes.push(item)
      })

      // 在 TabPane 使用 v-if 时，并不会按照预先的顺序渲染，这时可设置 index，并从小到大排序
      TabPanes.sort((a, b) => {
        if (a.index && b.index) {
          return a.index > b.index ? 1 : -1
        }
      })
      return TabPanes
    },
    updateNav () {
      this.navList = []
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          labelType: typeof pane.label,
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
        if (!this.$refs.nav) return
        const preTabs = this.$refs.nav.querySelectorAll(`.${prefixCls}-tab`)
        const tab = preTabs[index]
        // 修复关闭最后一个TabPane会报错
        this.barWidth = tab ? parseFloat(tab.offsetWidth) : 0

        if (index > -1) {
          let offset = 0
          const gutter = this.size === 'small' ? 0 : 16
          for (let i = 0; i < index; i++) {
            // getComputedStyle在IE中不能正确获取元素的宽度，改为通过offsetWidth获取，修正tabs的高亮下划线在IE中错位的问题
            offset += parseFloat(preTabs[i].offsetWidth) + gutter
          }

          this.barOffset = offset
        } else {
          this.barOffset = 0
        }
      })
    },
    updateStatus () {
      const tabs = this.getTabs()
      tabs.forEach(tab => { tab.show = (tab.name === this.name) || this.animated })
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
