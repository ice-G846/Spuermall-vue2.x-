<template>
  <div class="content">
    <div class="list-item">
      <div class="image">
        <img :src="good.image" alt="">
      </div>
      <div class="item-info">
        <div class="info-title">{{good.title}}</div>
        <div class="info-desc">{{good.desc}}</div>
        <div class="price">
          总价格：<span class="good-price">{{good.price}}</span>
          <span class="count">x {{good.count}}</span>
        </div>
      </div>
    </div>
    <div class="list-bottom">
      <div class="operate-determine" @click="determine">确认收货</div>
      <div class="operate-show">查看物流</div>
      <div class="more">更多</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'GoodList',
    props: {
      good: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      determine() {
        this.$emit('determine')
      }
    },
  }

</script>
<style scoped>
  .content {
    width: 95%;
    height: 170px;
    background-color: white;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3)
  }

  .list-item {
    display: flex;
  }

  .image img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
    margin: 15px 15px 10px 20px;
  }

  .item-info {
    flex: 1;
    margin-top: 15px;
    height: 100px;
    width: 200px;
    padding-right: 20px;
  }

  .info-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
    font-weight: 900;
  }

  .info-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: rgb(88, 88, 88);
  }

  .price {
    margin-top: 40px;
  }

  .good-price {
    color: red;
  }

  .count {
    float: right;
  }

  .list-bottom {
    display: flex;
    margin-top: 7px;
    flex-direction: row-reverse;
  }

  .more {
    font-size: 14px;
    color: rgb(149, 149, 149);
    margin-left: 20px;
    margin-right: auto;
    margin-top: 5px;
  }

  .operate-show {
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 30px;
    margin-right: 10px;
  }

  .operate-determine {
    background-color: var(--color-tint);
    color: white;
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 30px;
    margin-right: 10px;
  }
</style>