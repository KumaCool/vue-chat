// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import io from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    title: '入口页面', // 页面标题
    socket: io('http://localhost:3000') // 建立socket连接
  },
  getters: {
    set_cookie: function (state, name, value) {
      let time = new Date()
      time.setTime(time.getTime() + 30 * 24 * 60 * 1000)
      document.cookie = name + '=' + escape(value) + 'expires=' + time.toGMTString()
    }
  },
  mutations: {
    set_state: function (state, obj) {
      for (var k in obj) {
        if (k !== 'socket') state[k] = obj[k]
      }
    },
    socket_action: (state, obj) => {
      state.socket.emit('action', obj.data)
      state.socket.on('reAct', function (r) {
        obj.callback(r)
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
