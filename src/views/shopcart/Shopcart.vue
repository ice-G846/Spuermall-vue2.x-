<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list @removeGood="removeGood"></cart-list>
    <cart-bottom-bar @totalClick="totalClick" @calculateClick="calculateClick"></cart-bottom-bar>
    <toast :message="message" :show="showMessage"></toast>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar.vue'
  import Toast from 'components/common/toast/Toast'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ShopCart',
    components: {
      NavBar,
      CartList,
      CartBottomBar,
      Toast
    },
    data() {
      return {
        message: '',
        showMessage: false
      }
    },
    computed: {
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    },
    methods: {
      removeGood() {
        this.message = '成功移除商品'
        this.showMessage = true
        setTimeout(() => {
          this.message = ''
          this.showMessage = false
        }, 1000);
      },
      totalClick() {
        let totalCheck = this.list.filter(item => {
          return item.checked == false
        })
        for (let item of this.list) {
          if (totalCheck.length > 0) {
            item.checked = true
          } else {
            item.checked = false
          }
        }
      },
      calculateClick() {
        let isCheck = this.list.filter(item => {
          return item.checked
        })
        if (this.list.length === 0) {
          this.message = '购物车为空'
          this.showMessage = true
          setTimeout(() => {
            this.message = ''
            this.showMessage = false
          }, 1000);
        } else if (isCheck.length === 0) {
          this.message = '请选择对应商品'
          this.showMessage = true
          setTimeout(() => {
            this.message = ''
            this.showMessage = false
          }, 1000);
        } else {
          this.$confirm('确认购买选中商品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.commit('payment')
            this.$message({
              duration: 1000,
              type: 'success',
              message: '购买成功!'
            });
          }).catch(() => {
            this.$message({
              duration: 1000,
              type: 'info',
              message: '已取消购买'
            });
          });
        }
      },
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }

  .cart {
    background-color: #f2f2f2;
  }
</style>