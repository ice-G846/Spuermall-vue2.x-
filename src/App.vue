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
  @import 'assets/css/base.css'
</style>