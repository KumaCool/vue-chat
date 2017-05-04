<template>
  <div id="app">
    <Headers></Headers>
    <router-view></router-view>
    <Footers></Footers>
  </div>
</template>

<script>
import Headers from '@/components/Headers'
import Footers from '@/components/Footers'

export default {
  name: 'app',
  components: {
    Headers,
    Footers
  }
}
</script>

<style lang="less">
@import './assets/css/web.less';
</style>
