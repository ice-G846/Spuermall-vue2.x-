<template>
  <div id="home">
    <nar-bar class="home-nav">
      <h4 slot="center">购物街</h4>
    </nar-bar>
    <tab-control :titles="['流行','新款','精选']" @itemClick="tabClick" ref="tabControlTop" class="tab-control"
      v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @itemClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NarBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/goodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import { debounce } from 'common/utils.js'
  import { itemListenerMixin } from 'common/mixin'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NarBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
    },
    activated() {
      if (this.$refs.scroll.scroll != null) {
        this.$refs.scroll.scroll.scrollTo(0, this.saveY, 1);
        this.$refs.scroll.scroll.refresh();
      }
    },
    deactivated() {
      //保存y值
      if (this.$refs.scroll.scroll != null) {
        this.saveY = this.$refs.scroll.scroll.y
      }
      this.$bus.$off('itemImageLoad', this.ItemImgListener)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      //事件监听相关代码
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControlTop.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        if (position.y < -1000) {
          this.isShowBackTop = true;
        } else {
          this.isShowBackTop = false;
        }
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      //网络请求相关代码
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    background: var(--color-tint);
    color: white;
  }

  .tab-control {
    position: relative;
    background: white;
    z-index: 9;
    left: 0;
    right: 0;
  }

  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>