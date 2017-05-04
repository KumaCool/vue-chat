<template>
  <div class="Footer Center-Text Color">
    <ul>
      <li>消息</li>
      <li>联系人</li>
      <li>讨论组</li>
    </ul>
  </div>
</template>
<script>
export default{
  data () {
    return {}
  }
}
</script>
<style>
  .Footer{
    position: fixed;
    bottom: 0;
    padding: 15px;
    box-sizing: border-box;
  }
  .Footer ul{display: flex;}
  .Footer li{flex: 1}
</style>
