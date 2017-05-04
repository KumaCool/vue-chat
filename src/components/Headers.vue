<template>
  <div class="Color">
    <ul>
      <li class="Float-L">&lt;</li>
      <li class="Center-Text">{{title}}</li>
    </ul>
  </div>
</template>
<script>
export default{
  computed: {
    title () {
      return this.$store.state.title
    }
  }
}
</script>
<style scoped>
  div {
    padding: 10px;
    box-sizing: border-box;
  }
</style>
