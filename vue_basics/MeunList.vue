<template>
  <div class="menu_box">
    <!--  用户信息-->
    <div class="user_box">
      <img src="../assets/images/favicon.png" class="logo">
      <!--      用户信息下拉菜单-->
      <div class="userlogobox">
        <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <el-icon><UserFilled/></el-icon>
      {{ username }}
      <el-icon class="el-icon--right">
        <el-icon><CaretBottom/></el-icon>
      </el-icon>
    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="select">项目选择</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>

    <!--  菜单列表-->
    <el-menu router
        active-text-color="#ffd04b"
        style="background: green;border-right: 0px"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
    >

      <el-menu-item :index="item.path" v-for="item in menuList" :key="item.id">
        <el-icon><icon-menu /></el-icon>
        <span :class="item.icon"></span>
        <span>{{ item.name }}</span>
      </el-menu-item>


 </el-menu>
  </div>
</template>

<script>

import menus from "@/components/menu";

export default {
  name: "LeftMenu",
  data(){
    return{
      menuList: menus,
    }
  },
  computed: {
    username() {
      return window.sessionStorage.getItem('username')
    }
  },

  methods: {
    handleCommand(cmd) {
      // console.log(cmd)
      if (cmd === 'select') {
        //  切换到项目选择页面
        this.$router.push({name: "all"})
      } else if (cmd === 'logout') {
        //  清空token
        //  跳转登录
        window.sessionStorage.removeItem('token')
        this.$router.push({name: "login"})
      }
    }
  }
}
</script>

<style scoped>
.user_box {
  height: 53px;
  border-bottom: solid 1px #ffffff;
  align-items: center;
  display: flex;
}


.logo {
  width: 40px;
  height: 40px;
  padding-left: 15px;
  border-radius: 50px;
}

.userlogobox {
  flex: 1;
  text-align: center;
}
.el-menu-item:focus{
  background: #42b983;

}
.el-menu-item:hover{
  background: #42b983;
}



</style>
