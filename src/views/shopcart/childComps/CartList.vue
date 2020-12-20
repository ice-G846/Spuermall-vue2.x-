<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <div class="content" v-if="!isShow">
        <img class="image" src="~assets/img/common/shopcart.png">
        <p>购物车空空如也</p>
        <p class="tip">可以去看看有哪些想买的</p>
      </div>
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" @removeCart="removeCart(item)">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  export default {
    name: 'cart-list',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList']),
      isShow() {
        return this.cartList.length
      }
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    methods: {
      removeCart(item) {
        this.$store.commit('removeGood', item.iid)
        this.$emit('removeGood')
      }
    },
  }

</script>
<style scoped>
  .cart-list {
    height: 100%;
  }

  .content {
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }

  .image {
    margin-top: 150px;
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