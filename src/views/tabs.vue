<template>
  <div>
    <button @click="showSecond = !showSecond">change</button>
    <Tabs v-model="key1" :animated="true">
      <TabPane label="标签一" name="key1" v-if="showSecond" :index="1">标签一内容</TabPane>
      <TabPane label="标签二" name="key2" disabled :index="2">标签二内容</TabPane>
      <TabPane label="标签三" name="key3" :index="3">标签三内容</TabPane>
      <TabPane :label="label4" name="key4" :index="4">标签四内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
import Tabs from '@/components/tabs/tabs.vue'
import TabPane from '@/components/tabs/pane.vue'
export default {
  components: {
    Tabs,
    TabPane
  },
  data () {
    return {
      key1: 'key1',
      showSecond: false,
      label4: (h) => {
        return h('div', [
          h('span', '标签四-render'),
          h('span', '+')
        ])
      }
    }
  }
}
</script>
