<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a>
        <img :src="item.image" alt="轮播图" @load='imageLoad'>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {
    Swiper,
    SwiperItem
  } from 'components/common/swiper'

  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        defult: {
          return: []
        }
      },
      recommends: {
        type: Array,
        defult: []
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    },
  }
</script>

<style scoped>
</style>