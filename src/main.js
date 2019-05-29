import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Alert from './components/alert/alert.js'

Vue.config.productionTip = false

// 注册Alert全局服务
Vue.prototype.$Alert = Alert

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
