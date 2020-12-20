<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="back">
      </div>
      <div slot="center">我的订单</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'OrderFormNavBar',
    methods: {
      backClick() {
        this.$router.back()
      }
    },
    components: {
      NavBar
    }
  }

</script>
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    font-weight: 900;
  }


  .back img {
    display: inline-block;
    position: relative;
    top: 5px;
    left: 15px;
  }
</style>