<template>
  <div class="l-center">
    <div class="title">
      <img alt="Vue logo" src="../assets/logo.png" />
      QA工具平台
    </div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router="router"
      @select="selectHande"
    >
      <el-submenu index="金融">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>金融</span>
        </template>
        <el-menu-item index="/">订阅</el-menu-item>
        <el-menu-item index="/stark">借贷</el-menu-item>
        <el-menu-item index="/center">支付</el-menu-item>
      </el-submenu>


      <el-menu-item index="其他业务1">
        <i class="el-icon-menu"></i>
        <span slot="title">其他业务1</span>
      </el-menu-item>


      <el-submenu index="其他业务2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>其他业务2</span>
        </template>
        <el-menu-item index="/test">测试页面</el-menu-item>
      </el-submenu>



      <el-menu-item index="其他业务3">
        <i class="el-icon-setting"></i>
        <span slot="title">其他业务3</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      active: "/",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selectHande(key, keyPath) {
      keyPath.indexOf(key) > -1 && this.$store.commit("setPath", keyPath);
    //   console.log(key, keyPath);

      // console.log(,'this.$store')
    },
  },
  mounted() {
    let hash = location.hash.replace("#", "");
    console.log(hash, "hash");
    this.active = hash;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.l-center {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.l-center .title {
  height: 50px;
  line-height: 50px;
  text-align: left;
}
.l-center .title img {
  display: block;
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 10px;
  float: left;
}
.el-menu-vertical-demo {
  flex: 1;
  text-align: left;
}
</style>
