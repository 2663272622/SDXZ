// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import {post,get} from './api/http'
import api from './api/config'

import styleJson from './assets/js/map'
Vue.prototype.styleJson = styleJson 

import axios from 'axios'
import VueAxios from 'vue-axios'
 
 //配置全局變量  url
import httpConfig from './httpConfig'
Vue.prototype.$httpConfig = httpConfig


Vue.use(ElementUI)
 
import echarts from 'echarts'

Vue.prototype.$echarts = echarts  
 
 
Vue.use(VueAxios, axios)
//Vue.prototype.$post = post;
//Vue.prototype.$get = get;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
