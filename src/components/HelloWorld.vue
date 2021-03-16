<template>
  <div class="hello">

    <div class="ul">
      清除金融订阅数据： <el-input v-model="agreementUid" placeholder="请输入用户uid"></el-input>     <!-- el-input 【输入框】输入的内容存在"agreementUid"变量里 -->
      <el-button @click="agreementClear">提交</el-button>                                   <!--【提交】按钮，调用script.methods.agreementClear方法 -->
    </div>

    <div class="ul">
      执行代扣：
      <el-select v-model="withhold_channel" placeholder="选择代扣渠道">
        <el-option
            v-for="item in channels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input v-model="agreementID" placeholder="请输入订阅单agreement_id"></el-input>
      <el-button @click="withhold_start">执行</el-button>
    </div>
    <div class="ul">
      查看代扣数据：
      <el-select v-model="channel" placeholder="请选择渠道">
        <el-option
            v-for="item in channels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input v-model="agreement_id" placeholder="请输入金融侧agreement_id"></el-input>
      <el-button @click="get_exec_at">查询</el-button>
    </div>

    <div class="withhold_table" id="withhold_table">
      <template v-if = "tableData.length">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="withhold_id"
              label="代扣id"
              width="180">
          </el-table-column>
          <el-table-column
              prop="subject"
              label="代扣subject"
              width="240">
          </el-table-column>
          <el-table-column
              prop="status"
              label="代扣状态"
              width="130">
          </el-table-column>
          <el-table-column
              prop="exec_at"
              label="代扣日期"
              width="130">
          </el-table-column>
          <el-table-column
              prop="order_start_time"
              label="本单开始时间"
              width="150">
          </el-table-column>
          <el-table-column
              prop="order_end_time"
              label="本单结束时间"
              width="150">
          </el-table-column>
          <el-table-column
              prop="reason"
              label="代扣失败原因"
              width="180">
          </el-table-column>

        </el-table>
      </template>
    </div>


  </div>
</template>



<script>
import { agreementClearResult, test1 ,queryExecAt,withholdStart} from "../api/index";
export default {
  name: "HelloWorld",
  props: {  //接收参数
    msg: String,
  },

  data() {
    return {
      agreementUid: "",
      channels:[
        {value:"1",label:"微信",},
        {value:"2",label:"支付宝",}
      ],
      channel:"",
      agreement_id:"",
      withhold_channel:"",
      agreementID:"",
      tableData: []

    };
  },

  methods: {
    agreementClear() {
      if (!this.agreementUid){
        return this.$message({
          message: "请输入用户uid",
          type: "error"
        });
      }
      agreementClearResult(this.agreementUid).then((res) => {
        console.log(res, "res");
        if (res == 'succ') {
          this.$message({
            message: "清除完成",
            type: "success"
          });
        }
      });
    },
    get_exec_at(){
      // this.$alert( 'wl向你发起了上厕所的请求：',{
      //   customClass:"wl_test",
      //   showClose:true,
      //   center:true,
      //   confirmButtonText: '欣然接受',
      //   showCancelButton:true,
      //   cancelButtonText:'拒绝你',
      //   callback: () => {}
      // });

      if (!this.channel || !this.agreement_id){
        return this.$message({
          message:"请选择查询 渠道/agreement_id",
          type:"error"
        });
      }
      console.log(this.channel)
      console.log(this.agreement_id)
      let para = {
        "channel":this.channel,
        "agreement_id":this.agreement_id
      }
      queryExecAt(para).then((res) => {
        console.log(res,"res");
        this.tableData = res.data
        if (res.msg == '查无数据'){
          return this.$message({
            message:"空，未查询到记录，请检查输入",
            type:"error"
          });
        }

      });
    },

    withhold_start(){
      if (!this.withhold_channel || !this.agreementID){
        return this.$message({
          message:"请选择代扣渠道/订阅单号agreement_id",
          type:"error"
        });
      }
      console.log(this.withhold_channel)
      console.log(this.agreementID)
      let withholdPara = {
        "channel":this.withhold_channel,
        "agreement_id":this.agreementID
      }
      withholdStart(withholdPara).then((res) => {
        console.log(res,"res");
        if (res.msg == '查无数据'){
          return this.$message({
            message:"空，未查询到记录，请检查输入",
            type:"error"
          });
        }
        if (res.code == 'SUCCESS'){
          return this.$message({
            message:"操作成功，请查询代扣数据",
            type:"success"
          });
        }

      });

    },


    //范例写法，暂时没有使用到
    addressSub() {
      test1({
        name: this.value
      }).then((res) => {

        console.log(res, "res");        // 控制台输出响应
        alert(res.msg || "没找到msg")      // 弹窗 msg
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      });
    },
  },
}



</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 20px;
  text-align: left;
}
.ul {
  margin-top: 10px;
  margin-bottom: 40px;
}

.withhold_table {
  margin-top: 20px;
  margin-bottom: 50px;
}
.ul .el-input {
  width: 300px;
  margin-right: 20px;
}
.hello .el-select {
  margin-right: 20px;
}
</style>
