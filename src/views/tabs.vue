<template>
  <div>
    <Tabs v-model="key1">
      <TabPane label="标签一" name="key1">标签一内容</TabPane>
      <TabPane label="标签二" name="key2">标签二内容</TabPane>
      <TabPane label="标签三" name="key3">标签三内容</TabPane>
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
      key1: 'key1'
    }
  }
}
</script>
