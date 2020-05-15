<template>
  <div class="home" style="height:100%">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="left-menu">
      <div style="height:100%">
      <el-menu
      style="height:100%"
      :class="activeBg"
      :default-active="activeIndex"
      @select="handleSelete"
      @open="handleOpen"
      @close="handleClose"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409eff">
      <el-menu-item class="menu" index="service">
        <i class="el-icon-menu"></i>
        <span slot="title">服务</span>
      </el-menu-item>
      <el-menu-item class="menu" index="interface">
        <i class="el-icon-menu"></i>
        <span slot="title">接口</span>
      </el-menu-item>
      <el-menu-item class="menu" index="task">
        <i class="el-icon-menu"></i>
        <span slot="title">任务</span>
      </el-menu-item>
      <el-menu-item class="menu" index="logout">
        <i class="el-icon-menu"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
    </div>
    </div>
    <div class="left-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { logout } from '../requests/user'
export default {
  name: 'Home',
  components: {
  },
  props : {
    menu : String
  },
  data() {
    return {
      activeIndex:"service", //默认选中service
      activeBg:""
    }
  },
  methods : {
    handleSelete(index) {
      this.activeIndex = index
      switch (index) {
        case "logout":
          //需要补充退出登录方法
          logout().then(data =>  {
            let success = data.data.success
            if (success){
              this.$router.push("/login")
            }else{
              return;
            }
          });
          
          break;
        case "service":
          this.$router.push("/service")
          break;
        case "interface":
          this.$router.push("/interface")
          break;
        case "task":
          this.$router.push("/task")
          break;
      }
    },
    handleOpen(index) {
      console.log(index)
    },
    handleClose(index) {
      console.log(index)
    }
  },
  created() {
    this.activeIndex = this.menu
    
  },
  watch:{
      menu:function () {
          this.activeIndex = this.menu
      }
  }
}
</script>

<style scoped>
  .home {
    display: flex;

  }
  .left-menu {
    width: 15%;
    padding-left: 0px;
  }
  .left-content {
    width: 85%;
  }
  .menu {
    text-align: left;
  }
  .el-menu-item {
          color: #777F8F;
  }
  .el-menu-item.is-active {
          color: rgb(64, 158, 255);
          background-color:rgb(48, 65, 86);
  }
</style>
