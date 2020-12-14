<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick='titleClick'></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramsInfo'></detail-param-info>
      <detail-comment-info :comment-info='commentInfo'></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
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

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
  import { debounce } from 'common/utils'
  import { itemListenerMixin } from 'common/mixin'

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
        themeTopYs: [0, 1000, 2000, 3000]
      }
    },
    mixins: [itemListenerMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
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
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0)
      }
    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.ItemImgListener)
    },
  }

</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .content {
    height: calc(100vh - 44px);
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: white;
  }
</style>