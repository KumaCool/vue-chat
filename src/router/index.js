import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/UserList'
import Sign from '@/components/Sign'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/contact',
      name: 'UserList',
      component: UserList
    }, {
      path: '/sign',
      name: 'Sign',
      component: Sign
    }
  ]
})
