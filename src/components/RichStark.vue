<template>
  <div class="sk">

    <div class="sk-clear">
      清除金融侧借贷数据： <el-input v-model="starkUid" placeholder="请输入用户uid"></el-input>
      <el-button @click="starkClear">提交</el-button>
    </div>

  </div>
</template>



<script>
import { starkClearResult } from "../api/index";
export default {
  name: "RichStark",
  props: {  //接收参数
    msg: String,
  },

  data() {
    return {
      starkUid: "",
    };
  },

  methods: {
    starkClear() {
      if (!this.starkUid){
        return this.$message({
          message: "请输入用户uid",
          type: "error"
        });
      }
      starkClearResult(this.starkUid).then((res) => {
        console.log(res, "res");
        if (res == 'succ') {
          this.$message({
            message: "清除完成",
            type: "success"
          });
        }
      });
    },
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sk {
  padding: 20px;
  text-align: left;
}
.sk-clear {
  margin-top: 10px;
  margin-bottom: 40px;
}
.sk-clear .el-input {
  width: 300px;
  margin-right: 20px;
}
</style>
