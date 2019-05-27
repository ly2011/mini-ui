const code = `<template>
    <div>
      <input v-model="message" />
      {{message}}
      <template>
        <p>我只是想测试程序会不会报错</p>
      </template>
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          message: ''
        }
      }
    }
  </script>
  `
export default code
