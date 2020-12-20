<template>
  <div id="category">
    <nar-bar class="home-nav">
      <h4 slot="center">购物街</h4>
    </nar-bar>
  </div>
</template>

<script>
  import NarBar from 'components/common/navbar/NavBar'

  export default {
    name: "Category",
    components: {
      NarBar
    },
    data() {
      return {
      }
    },
    created() {
    },
  }
</script>

<style scoped>

</style>