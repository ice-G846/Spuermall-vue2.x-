<template>
  <div class="orderform">
    <order-form-nav-bar></order-form-nav-bar>
    <scroll class="list-item" ref="scroll">
      <good-list v-for="(item,index) in goodsList" :good="item" :key="index" @determine="determine(index)"></good-list>
      <div class="content" v-if="!isShow">
        <img class="image" src="~assets/img/common/orderform.png">
        <p>您还没有相关的订单</p>
        <p class="tip">可以去看看有哪些想买的</p>
      </div>
    </scroll>
  </div>
</template>

<script>
  import OrderFormNavBar from './childComps/OrderFormNavBar'
  import GoodList from './childComps/GoodList.vue'
  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "OrderForm",
    components: {
      OrderFormNavBar,
      GoodList,
      Scroll
    },
    computed: {
      ...mapGetters(['goodList']),
      goodsList() {
        return this.goodList
      },
      isShow() {
        return this.goodList.length
      }
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    methods: {
      determine(index) {
        this.$confirm('确认收货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteCart', index)
        }).catch(() => { });
      }
    },
  }

</script>
<style scoped>
  .orderform {
    background-color: #f2f2f2;
  }

  .list-item {
    height: calc(100vh - 49px - 44px);
    overflow: hidden;
  }

  .image {
    margin-top: 20px;
    width: 100px;
  }

  .content {
    text-align: center;
  }

  .tip {
    margin-top: 10px;
    color: rgb(158, 158, 158);
    font-size: 14px;
  }
</style>