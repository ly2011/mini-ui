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
    },
    {
      path: '/alert',
      name: 'alert',
      component: () => import('./views/alert.vue')
    },
    {
      path: '/table-render',
      name: 'table-render',
      component: () => import('./views/table-render.vue')
    },
    {
      path: '/table-slot',
      name: 'table-slot',
      component: () => import('./views/table-slot.vue')
    },
    {
      path: '/tree',
      name: 'tree',
      component: () => import('./views/tree.vue')
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('./views/button.vue')
    }
  ]
})
