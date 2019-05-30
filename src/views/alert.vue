<template>
  <div>
    <button @click="handleOpen1">打开提示 1</button>
    <button @click="handleOpen2">打开提示 2</button>
    <button @click="renderFunc">打开提示 3</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen1 () {
      this.$Alert.info({
        content: '我是提示信息 1'
      })
    },
    handleOpen2 () {
      this.$Alert.info({
        duration: 3,
        content: '我是提示信息 2'
      })
    },
    renderFunc () {
      this.$Alert.info({
        duration: 3,
        render: h => {
          return h('span', [
            'This is created by ',
            h('a', 'render'),
            ' function'
          ])
        }
      })
    }
  }
}
</script>

<style>
</style>
