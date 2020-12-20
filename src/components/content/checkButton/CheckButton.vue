<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="~/assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return true
        }
      }
    }
  }

</script>
<style scoped>
  .check-button {
    border-radius: 50%;
    background-color: white;
    border: 1px solid rgb(255, 138, 210)
  }

  .checked {
    background-color: #dd6868;
  }
</style>