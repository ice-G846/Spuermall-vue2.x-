<template>
<div class="goodsList">
  <goods-list-item class="goods-list-item" v-for="(item,index) in goods" :key="index" :goodsItem="item"></goods-list-item>
</div>
</template>

<script>
import goodsListItem from './goodsListItem'

export default {
  name: 'goodsList',
  props: {
    goods: {
      type: Array,
      default: []
    }
  },
  components: {
    goodsListItem
  }
}
</script>

<style scoped>
.goodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.goods-list-item {
  width: 48%;
}
</style>
