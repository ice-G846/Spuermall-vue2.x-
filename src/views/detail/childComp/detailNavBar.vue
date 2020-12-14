<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" @click="titleClick(index)" class="item" :key="index"
          :class="{active: currentIndex === index}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back();
      }
    }
  }

</script>
<style scoped>
  .title {
    display: flex;
    font-size: 16px;
  }

  .item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  .back img {
    padding-top: 1.5vh;
    padding-left: 3vh;
    height: 30px;
  }
</style>