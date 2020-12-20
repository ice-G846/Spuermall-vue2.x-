<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info ref="params" :param-info='paramsInfo'></detail-param-info>
      <detail-comment-info ref="comment" :comment-info='commentInfo'></detail-comment-info>
      <goods-list ref="list" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="showMessage"></toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComp/detailNavBar'
  import DetailSwiper from './childComp/detailSwiper'
  import DetailBaseInfo from './childComp/DetailBaseInfo'
  import DetailShopInfo from './childComp/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComp/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComp/DetailParamInfo.vue'
  import DetailCommentInfo from './childComp/DetailCommentInfo.vue'
  import GoodsList from 'components/content/goods/goodsList'
  import DetailBottomBar from './childComp/DetailBottomBar'
  import Toast from 'components/common/toast/Toast'

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
  import { debounce } from 'common/utils'
  import { itemListenerMixin, backTopMixin } from 'common/mixin'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        imgRefresh: null,
        currentIndex: 0,
        isShowBackTop: false,
        message: '',
        showMessage: false
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Toast
    },
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      //图片防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.list.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 200)
      this.imgRefresh = debounce(() => {
        this.$refs.scroll.refresh()
      }, 200)
    },
    methods: {
      imageLoad() {
        this.imgRefresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
      },
      contentScroll(position) {
        if (position.y < -1000) {
          this.isShowBackTop = true;
        } else {
          this.isShowBackTop = false;
        }
        let positionY = -position.y
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart() {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.detailInfo.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        this.$store.dispatch('addCart', product).then(res => {
          this.showMessage = true
          this.message = res
          setTimeout(() => {
            this.showMessage = false
            this.message = ''
          }, 1000);
        })
      }
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.ItemImgListener)
    }
  }

</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .content {
    height: calc(100vh - 44px - 59px);
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: white;
  }
</style>