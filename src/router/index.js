import Vue from 'vue'
import Router from 'vue-router'

import LOGIN from '@/components/Login'
import TABLE from '@/components/Table'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LOGIN
    },
    {
      path: '/table',
      name: 'Table',
      component: TABLE
    }
  ]
})
