<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img class="privateImage-svg left" src="~assets/img/common/photo.jpg">
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div class="user">ice-G</div>
        </slot>
        <div class="phone">
          <div slot="user-phone"><i class="el-icon-phone"></i>暂无绑定手机号</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  .user {
    margin-left: 20px;
  }

  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .left {
    float: left;
    margin-left: 20px;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
</style>