<template>
  <div class="no1">
    <iframe
      name="son"
      src="http://www.覃钧.top/1.html"
      width="100%"
      height="100%"
      scrolling="no"
      security="restricted"
      sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
      frameborder="0"
    ></iframe>
    <el-button round :v-model="djs" class="jj" @click="go()">跳过广告({{djs}})</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      djs: 3
    };
  },
  methods: {
    gun() {
      this.djs--;
      if (this.djs < 0) {
        clearInterval(this.timer);
        this.$router.push("/home");
      }
    },
    go() {
      this.$router.push("/home");
    }
  },
  mounted() {
    this.timer = setInterval(this.gun, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style>
html,
body {
  height: 99%;
}
main {
  width: 100%;
  /* height: 99.3%; */
  height: 100%;
}
.no1 {
  width: 100%;
  height: 100%;
}
.jj {
  position: absolute;
  bottom: 3%;
  right: 3%;
  opacity: 0.4;
}
</style>