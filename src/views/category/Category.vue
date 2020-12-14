<template>
<div class="wrapper" ref="wrapper">
  <ul class="content">
    <li v-for="item in 50" :key="item">标题{{item}}</li>
  </ul>
</div>
</template>

<script>
import BSscroll from 'better-scroll'
import BScroll from 'better-scroll'

export default {
  name: 'Categroy',
  created() {

  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BSscroll(this.$refs.wrapper, {
      probeType: 3,
      pullUpLoad: true
    })
    this.scroll.on('scroll', position => {
      //console.log(position);
    })
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');
      setTimeout(() => {
        this.scroll.finishPullUp()
        this.scroll.refresh()
      }, 1000)
    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 200px;
  background: #ccc;
  overflow: hidden;
}
</style>
