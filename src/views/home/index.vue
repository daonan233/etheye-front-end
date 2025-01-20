<script setup>
import { ref } from 'vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar, ElHeader, ElContainer, ElAside, ElMenu, ElMenuItem } from 'element-plus';
import 'element-plus/dist/index.css';
import router from "@/router";

const activeMenu = ref('1');

function handleSelect(index) {
  activeMenu.value = index;
}

function  gotoHome(){
  router.replace('/home')
  location.reload();
}
function handleCommand(command) {
  if (command === 'logout') {
    // 这里可以添加退出登录的逻辑，例如清除用户信息，跳转至登录页面等
    router.replace('/login')
  }
}
</script>
<template>
  <div>
    <!-- 顶部导航栏 -->
    <el-header height="80px">
      <div class="header-container">
        <div class="logo" @click="gotoHome">
          <el-image style="height:48px;weight:auto" src="src/assets/logo.png"></el-image>
        </div>
        <div class="user-info">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar size="medium" src="src/assets/avatar.png" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <!-- 侧边栏和主要内容容器 -->
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单 1</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">菜单 2</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">菜单 3</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>



<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}
.logo {
  margin-top:40px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
.logo:hover{
  cursor:pointer;
}
.user-info {
  display: flex;
  align-items: center;
}
</style>