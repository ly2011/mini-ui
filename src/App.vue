<template>
  <div id="app">
    <div id="nav">
      <router-link to="/form">具有数据校验功能的表单组件 —— Form</router-link>|
      <router-link to="/checkbox">组合多选框组件——CheckboxGroup & Checkbox</router-link>|
      <router-link to="/display">动态渲染 .vue 文件的组件-- Display</router-link>|
      <router-link to="/alert">全局提示组件 -- Alert</router-link>|
      <router-link to="/table-render">表格组件 Render-- Table</router-link>|
      <router-link to="/table-slot">表格组件 Slot -- Table</router-link>|
      <router-link to="/tree">树形组件 -- Tree</router-link>|
      <router-link to="/button">树形组件 -- Button</router-link>|
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
