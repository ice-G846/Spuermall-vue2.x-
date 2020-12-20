<template>
  <transition name="toast-total">
    <div class="toast" v-if="show">
      <div>{{message}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      message: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }

</script>
<style scoped>
  .toast-total-enter-active {
    transition: opacity 1.5s;
  }

  .toast-total-enter {
    opacity: 0;
  }

  .toast-total-leave-active {
    transition: opacity 1s;
  }

  .toast-total-leave-to {
    opacity: 0;
  }

  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .7);
    color: white;
    padding: 8px 10px;
    border-radius: 3px;
    transition: all 1s;
  }
</style>