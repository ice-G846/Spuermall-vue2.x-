<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" @click.native="totalClick" :is-checked="isChecked"></check-button>
      <label>全选</label>
    </div>
    <div class="tottal-price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calculateClick">
      结算: {{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return "￥" + this.cartList.filter(item => {
          return item.checked
        }).reduce((prevalue, item) => {
          return prevalue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return "(" + this.cartList.filter(item => {
          return item.checked
        }).length + ")"
      },
      isChecked() {
        if (this.cartList.length === 0) return false
        return !this.cartList.filter(item => {
          return !item.checked
        }).length
      }
    },
    methods: {
      totalClick() {
        this.$emit('totalClick')
      },
      calculateClick() {
        this.$emit('calculateClick')
      }
    },
  }

</script>
<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: white;
    position: relative;
    display: flex;
    box-shadow: 0 -1px 3px rgba(100, 100, 100, 0.1)
  }

  .check-content {
    display: flex;
    align-items: center;
    line-height: 40px;
    margin-left: 20px;
    width: 100px
  }

  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 10px;
  }

  .tottal-price {
    line-height: 40px;
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    line-height: 40px;
    width: 130px;
    text-align: center;
    background-color: rgb(255, 122, 60);
    color: white;
  }
</style>