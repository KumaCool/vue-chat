<template>
  <form @submit.prevent="submit">
    <div>
      <ul>
        <li>帐号 <input type="text" name="user" v-model="form.user"></li>
        <li>密码 <input type="password" name="password" v-model="form.password"></li>
      </ul>
      <ul v-if="!title">
        <li>确认密码 <input type="password" name="password"></li>
        <li>邮箱 <input type="text" name="email" v-model="form.email"></li>
        <li>
          <input type="submit" value="注册">
          <input @click='change' type="button" value="登录">
        </li>
      </ul>
      <ul v-else>
        <li>
          <input type="submit" value="登录">
          <input @click='change' type="button" value="注册">
          忘记密码?
        </li>
      </ul>
    </div>
  </form>
</template>
<script>
export default{
  data () {
    return {
      title: true, // true:登录,false:注册
      form: {
        user: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    change: function () {
      var temp
      temp = this.title ? '用户注册' : '用户登录'
      this.title = !this.title
      this.$store.commit('set_state', {title: temp})
    },
    submit: function () {
      let obj = {
        type: this.title ? 'signIn' : 'signUp',
        data: this.form
      }
      obj = {
        data: JSON.stringify(obj),
        callback: r => {
          if (r.code === 1) {
            var temp = {
              name: 'user',
              value: 'user:' + this.form.user + ',token:' + r.info
            }
            this.$store.commit('set_cookie', temp)
            // 跳转
          } else if (this.title) {
            console.log('用户名或密码错误!')
          } else console.log('该用户已被占用!')
          console.log(r)
        }
      }
      this.$store.commit('socket_action', obj)
    }
  },
  created: function () {
    this.change()
  }
}
</script>
<style scoped>

</style>
