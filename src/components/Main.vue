<template>
  <div style="height:100%">
    <el-container style="height:100%">
      <el-header style="*background-color: #066cac; height:70px;border-bottom:4px solid #143f6d;background: linear-gradient(to right, #143f6d , #066cac);">
        <el-col :span="10" style="font-size:30px; margin-top:7px; color:white">
          <img src="./../../static/images/t_logo.png" width="480px">
        </el-col>
        <el-col :span="14" style="text-align:right; margin-top:10px;" class="userinfo">
          <el-dropdown trigger="hover" style="float:right;">
            <span>
              <img src="../assets/damei_logo.jpg" class="adminIcon"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="float:right;margin-right: 10px;color:#fff;line-height: 50px;font-size: 14px;">
            欢迎您：
          </div>
          <div style="float:left;">
            <img src="./../../static/images/t_da.png" width="">
          </div>
        </el-col>
      </el-header>
      <el-container>
        <el-aside style="text-align: left;  background-color: #143f6d; width:200px;">
          <el-row class="tac">
            <el-col >
              <el-menu default-active="2"
                       class="el-menu-vertical-demo"
                       background-color="#143f6d"
                       text-color="#fff"
                       active-text-color="#ffd04b" style="border:none">
                <template v-for="(item,index) in $router.options.routes">
                  <el-submenu :index="index+''" v-if="!item.leaf && !item.hidden"  style=" background-color: #eef1f6;border-bottom:1px solid #003165;overflow: hidden;">
                    <template slot="title">

                      <i :class="item.iconCl"></i>
                      <span>{{item.name}} </span>
                    </template>
                    <el-menu-item  style="border-top:1px solid #003165;padding-left:54px;" @click="menuClick(child.path)" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                  </el-submenu>
                </template>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <section class="content-container">
            <div class="grid-content bg-purple-light" style="border-bottom:1px solid #eee;height:28px">
              <el-col  class="breadcrumb-container">
                <el-breadcrumb separator="/" class="breadcrumb-inner">
                  <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                    {{ item.name }}
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </el-col>
              <br/><br/>
              <el-col :span="24" class="content-wrapper">
                <router-view></router-view>
              </el-col>
            </div>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        adminIcon :"./asset/logo.png"
      }
    },
    methods: {

      menuClick: function (path)
      {
        this.$router.push({path: path})
      },

      // 退出
      logout: function ()
      {
        this.$router.push({path: "/SignIn"});
      }
    }

  }

</script>

<style>
  .adminIcon{
    border-radius: 25px;
    width:50px;
    height:50px;
  }
</style>
