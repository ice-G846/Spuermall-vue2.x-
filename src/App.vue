<template>
  <Div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </Div>
</template>

<script>
  import MainTabBar from './components/content/mainTabBar/MainTabBar'
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  .el-message-box {
    width: 70% !important;
  }

  .el-button--primary {
    background-color: var(--color-tint) !important;
    border: var(--color-tint) !important;
  }

  @import 'assets/css/base.css';
</style>