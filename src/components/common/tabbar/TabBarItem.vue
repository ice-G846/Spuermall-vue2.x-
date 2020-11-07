<template>
<div id="tab-bar-item" @click="itemClick">
  <div v-show="!isActive">
    <slot name="item-icon"></slot>
  </div>
  <div v-show="isActive">
    <slot name="item-icon-active"></slot>
  </div>
  <div :style="activeStyle">
    <slot name="item-text"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {}
  },
  computed: {
    isActive() {
      return this.$route.path == this.path
    },
    activeStyle() {
      return this.isActive ? {
        color: this.activeColor
      } : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => '') //catch 重复点击报错修复
    }
  }

}
</script>

<style scoped>
#tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /*line-height: 49px;*/
  font-size: 13px;
}

#tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
}
</style>
