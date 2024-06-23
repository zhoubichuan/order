import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Table from '@/components/Table';
import Custominfo from '@/components/Custominfo';
import Menu from '@/components/Menu';

Vue.use(Router)

export default new Router({
  base: '/order/',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/custominfo',
      name: 'Custominfo',
      component: Custominfo
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    }
  ]
})
