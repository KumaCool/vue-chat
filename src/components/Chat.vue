<template>
  <div>
    <ul>
      <li><a href=""><img src=""></a></li>
      <li>{{message}}</li>
    </ul>
  </div>
</template>
<script>
export default{
  data () {
    return {
      other: ''
    }
  },
  created: function () {
    this.$store.commit('set_state', {title: other})
  }
}
</script>