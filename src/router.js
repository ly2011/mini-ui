import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/form',
      name: 'form',
      component: () => import('./views/form.vue')
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: () => import('./views/checkbox.vue')
    },
    {
      path: '/display',
      name: 'display',
      component: () => import('./views/display.vue')
    }
  ]
})
