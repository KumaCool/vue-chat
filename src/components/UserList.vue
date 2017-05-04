<template>
  <div class="Line">{{title}}
    <ul v-for="u in user">
      <li><img :src="u.img"></li>
      <li>{{u.name}}</li>
      <li class="Float-R Icon-Msg Center-Text">{{u.count}}</li>
    </ul>
  </div>
</template>
<script>
let userData = [
  {
    name: 'a',
    count: 5
  }, {
    name: 'b',
    count: 99
  }
]
export default{
  props: ['title'],
  data () {
    return {
      user: userData
    }
  },
  created: function () {
    this.$store.commit('set_state', {title: '联系人'})
  }
}
</script>
<style>
  .Line ul{
    padding: 10px;
    width: 100%;
    border-bottom: 1px solid #DDD;
    display: table;
    box-sizing: border-box;
  }
</style>
