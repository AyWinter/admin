<template>
    <div>
      <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; height:45px;background-color: #f2f2f2;">
          <el-form size="small" :inline="true" :model="filters" style="padding: 5px;">
            <el-form-item label="状态">
              <el-select v-model="filters.state" style="width:210px;">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="审核中" value="0"></el-option>
                <el-option label="审核成功" value="1"></el-option>
                <el-option label="审核失败" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" v-on:click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-table size="mini" :data="enterprises"
                  v-loading="listLoading" border >
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="name" label="企业名称" width="200">
          </el-table-column>
          <el-table-column prop="phoneNo" label="联系电话" width="150">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="150">
          </el-table-column>
          <el-table-column prop="legalPerson" label="法人" width="150">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.state | formatState}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="detail(scope.row.id)">详细</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar" style="background-color: #f2f2f2;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 50]"
            layout="sizes, prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="pageChange">
          </el-pagination>
        </el-col>
      </section>
    </div>
</template>
<script>
  var qs = require('qs');
    export default {
      data(){
        return{
          enterprises:[],
          listLoading:false,
          total: 0,
          page: 0,
          pageSize: 10,
          filters:{
            state: "-1"
          }
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
        this.init();
      },
      methods: {

        init: function ()
        {
          this.listLoading = true;

          var data = {};
          data.page = this.page;
          data.pageSize = this.pageSize;
          data.state = this.filters.state;

          var url = global.API_ADDRESS + "enterprise";

          this.$http.post(url, qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{

            var code = response.data.code;
            if (code == -2)
            {
              // 登录信息过期
              this.$router.push({path: "/SignIn"});
            }

            this.enterprises = response.data.data.content;
            this.total = response.data.data.totalElements;
            this.pageSize = response.data.data.size;
            this.page = response.data.data.totalPages
            this.listLoading = false;
          }).catch(function (error){
            console.log(error);
            this.listLoading = false;
          })
        },

        handleSizeChange: function (val) {

          this.pageSize = val;
          this.page = 0;
          this.init();
        },

        pageChange: function (page) {
          this.page = page - 1;
          this.init();
        },

        // 查询
        search: function ()
        {
          this.page = 0;
          this.init();
        },

        // 详细
        detail: function (id)
        {
          this.$router.push({path: "/enterprise/detail/"+id});
        }
      }
    }
</script>
