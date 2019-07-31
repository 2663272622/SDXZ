import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'


import header from '@/components/header'

Vue.component('headTitle',header)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
