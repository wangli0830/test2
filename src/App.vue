<template>
  <div id="app">
    <div id="left">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <Menu />
    </div>
    <div class="center">
      <div class="top">
        <a
          v-for="(i, index) in $store.state.path"
          :class="setClass(index)"
          :key="index"
          >{{ i }}</a
        >
      </div>
      <div class="cont">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/menu.vue";
export default {
  components: {
    Menu,
  },

  methods: {
    setClass(index) {
      if (index == this.$store.state.path.length-1) {
        return 'last';
      } else {
        return '';
      }
    },
  },
};
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
}

#left {
  width: 240px;
}
.center {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.center .top {
  height: 50px;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  text-align: left;
  padding-left: 20px;
}
.center .top a{
  display: inline-block;
  padding: 0 5px;
  line-height: 50px;
  cursor: pointer;
}
.center .top .last{
  cursor: no-drop;
  color: #919191;
}
.center .cont {
  flex: 1;
}
</style>
