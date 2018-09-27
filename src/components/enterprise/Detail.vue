<template>
    <div>
      <table class="dataintable">
        <tr>
          <td>状态：</td>
          <td colspan="3">{{enterprise.state | formatState}}</td>
        </tr>
        <tr>
          <td style="width:140px">企业名称：</td>
          <td>{{enterprise.name}}</td>
          <td style="width:140px">联系方式：</td>
          <td>{{enterprise.phoneNo}}</td>
        </tr>
        <tr>
          <td style="width:140px">地址：</td>
          <td>{{enterprise.address}}</td>
          <td style="width:140px">法人：</td>
          <td>{{enterprise.legalPerson}}</td>
        </tr>
        <tr>
          <td style="width:140px">法人身份证号码：</td>
          <td>{{enterprise.legalPersonIdcardNo}}</td>
          <td style="width:140px">账号：</td>
          <td>{{enterprise.accountNumber}}</td>
        </tr>
        <tr>
          <td style="width:140px">开户行：</td>
          <td>{{enterprise.depositBank}}</td>
          <td style="width:140px">开户支行：</td>
          <td>{{enterprise.depositBankBranch}}</td>
        </tr>
        <tr>
          <td style="width:140px;">法人身份证：</td>
          <td><img :src="enterprise.legalPersonIdcard" style="width:100px;height:120px;"/></td>
          <td style="width:140px">营业执照：</td>
          <td><img :src="enterprise.businessLicense" style="width:100px;height:120px;"/></td>
        </tr>
        <tr v-if="enterprise.state != 1">
          <td colspan="4">
            <el-button type="primary" size="small" v-on:click="examine(1)">审核成功</el-button>
            <el-button type="danger" size="small" v-on:click="examine(2)">审核失败</el-button>
          </td>
        </tr>
      </table>
    </div>
</template>
<script>
  var qs = require('qs');
    export default {
      data(){
        return {
          enterpriseId: 0,
          enterprise: "",
          formLabelWidth: "120px"
        }
      },
      filters: {
        formatState: function (value)
        {
          if (value == 0)
          {
            return "审核中";
          }
          else if (value == 1)
          {
            return "审核成功";
          }
          else if (value == 2)
          {
            return "审核失败";
          }
        }
      },
      mounted: function ()
      {
        this.enterpriseId = this.$route.params.enterpriseId;
        this.init();
      },
      methods: {

        init: function ()
        {
          var url = global.API_ADDRESS + "enterprise/" + this.enterpriseId;

          this.$http.get(url, {}).then((response)=>{
            var code = response.data.code;
            if (code == -2)
            {
              // 登录信息过期
              this.$router.push({path: "/SignIn"});
            }
            this.enterprise = response.data.data;
          }).catch(function (error){
            console.log(error);
          })
        },

        // 审核
        examine: function (state)
        {
          this.$confirm('确认操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var data = {
              id: this.enterpriseId,
              state: state
            };
            var url = global.API_ADDRESS + "enterprise/state";
            this.$http.post(url, qs.stringify(data), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response)=>{
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              });
              this.init();
            }).catch(function (error){
              console.log(error);
            })
          });
        }
      }
    }
</script>
<style type="text/css">
  .dataintable {
    margin-top:15px;
    border-collapse:collapse;
    border:1px solid #F5F5F5;
    width:80%;
    font-size: 13px;
  }
  .dataintable td {
    vertical-align:text-top;
    padding:6px 15px 6px 6px;
    border:1px solid #eeeeee;
  }
</style>
