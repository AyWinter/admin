<template>
  <div class="login">
    <h2 class="l_logo"><img src="./../../static/images/h_logo.png" width="480px;"></h2>
    <div class="login_box">
      <h2>欢迎登录</h2>
      <div class="sign_item">
        <div class="l_item">
          <span>用户名：</span>
          <input v-model="mobileNo" maxlength="11" type="text" placeholder="请输入手机号码">
        </div>
        <div class="l_item">
          <span>密码：</span>
          <input v-model="password" maxlength="16" type="password" placeholder="请输入密码">
        </div>
      </div>
      <a href="javascript:;" @click="sign" class="sign_btn">登录</a>
    </div>
    <div class="login_b">长沙达美文化传播有限公司<br>中国一级广告企业</div>
  </div>
</template>
<script>
    export default {
      data(){
        return{
          mobileNo: '',
          password: '',
          msg: "",
        }
      },
      methods:{

        sign: function ()
        {
          if (this.mobileNo == "")
          {
            this.$message.error('请输入手机号码');
            return;
          }
          if (this.password == "")
          {
            this.$message.error('请输入密码');
            return;
          }

          var url = global.API_ADDRESS + "/login/"+this.mobileNo+"/"+this.password+"/1234";

          this.$http.get(url, {}).then((response)=>{
            var code = response.data.code;
            if (code == 0)
            {
              var token = response.data.data;
              sessionStorage.setItem("token", token);
              this.$router.push({path: "/home"})
            }
            else
            {
              var msg = response.data.msg;
              this.$message.error(msg);
            }
          }).catch(function (error){
            console.log(error);
          })
        }
      }
    }
</script>
<style>
  body,html{ font-family:"Microsoft YaHei";margin:0;padding:0;border:0;width:100%;height:100%;}
  ul,ol{list-style-type:none;}
  .login{width:100%;height:100%;position: relative;background-image: url(./../../static/images/h_bg.jpg); background-size:cover; background-repeat: no-repeat;}
  .login h2.l_logo{ text-align: center;margin: auto;padding:20px;}
  .login_box{position: absolute;width:460px;padding:40px; box-sizing: border-box; box-shadow: 0 0 20px rgba(0,0,0,0.5);margin-left:-230px;left:50%;top:200px; background-color: #fff;border-radius:20px; overflow:hidden;}
  .login_box h2{font-size: 32px;font-weight:bold; text-align: center;margin-top:0px;}
  .login_box .sign_item{margin-top:20px;position: relative;}
  .login_box .sign_item .l_item{border-radius:5px; background-color:#f8fafc; border:1px solid #dddddd;height:40px;padding:3px;line-height: 40px; margin-bottom: 20px; }
  .login_box .sign_item .l_item span{float:left;width:80px; text-align: right;color:#333; font-size: 16px;}
  .login_box .sign_item .l_item input{border:0 none; background: none;line-height: 40px;margin-left: 20px; outline: none; font-size: 16px;}
  .login_box .sign_btn{border-radius:5px; background-color: #3d96f2;color:#fff;text-align: center;line-height:50px; display: block; text-decoration: none;font-size: 18px;}
  .login_box .l_code{position: absolute;right:0px;bottom:0px; vertical-align: middle;}
  .login_box .l_code img{vertical-align: middle;}
  .login_b{position: absolute;top:560px; text-align: center;left:0;right:0;color:#fff;font-size: 16px;}
</style>
