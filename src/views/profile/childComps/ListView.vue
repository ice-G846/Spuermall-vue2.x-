<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <div class="info" @click="redirect(index)"><i class="icons" :class="item.icon"></i> {{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    props: {
      listData: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      redirect(index) {
        if (this.listData[index].href !== undefined) {
          this.$router.push('/orderform')
        }
      }
    },
  }
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 16px;
    color: #333;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icons {
    margin-right: 10px;
  }

  .item .icon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .item .info {
    margin: 0 20px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>