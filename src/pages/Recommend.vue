<template>
  <el-container class="wraper1" v-if="datalist[0]">
    <div class="box1">
      <el-main>
        <el-row :gutter="20">
          <el-col v-for="item in datalist" :key="item._id" :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
            <el-card :body-style="{ padding: '0px' }" @click.native="gotoDetail(item.gid)">
              <img :src="item.url" class="image" />
              <div style="padding: 14px;text-align: center;">
                <div class="goodname">{{item.title}}</div>
                <div class="goodprice">{{item.price}}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </div>
    <el-backtop target=".wraper" :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >🌺</div>
    </el-backtop>
  </el-container>
  <div
    v-else
    v-loading.fullscreen.lock="true"
    element-loading-text="大坏蛋，人家正在为你加载啦"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <img src="../image/1.gif" class="ggimg" />
    <img src="../image/1.gif" class="ggimg1" />
  </div>
</template>
<script>
import { my } from "../api";
export default {
  data() {
    return {
      drawer: false,
      direction: "ltr",
      Show_hidden: true,
      value: "",
      datalist: []
    };
  },
  methods: {
    goHome(path) {
      this.$router.push(path);
    },
    gotoDetail(id) {
      this.$router.push({ name: "goods", params: { id } });
    }
  },
  async created() {
    let {
      data: { data }
    } = await my.get("/goods/ddd", {
      query: "send_friend"
    });
    this.datalist = data;
  }
};
</script>
<style lang="scss">
//隐藏滚动条
// .el-scrollbar__wrap {
//   overflow-x: hidden;
// }
//<el-scrollbar style="height:100%">
.wraper1 .box1 .el-main {
  padding-top: 5%;
}
.wraper1 {
  height: 100vh;
  overflow-x: hidden;
}
.sousuo {
  width: 100%;
  height: 48px;
  padding: 10px 0 0 30px;
  border: none;
  margin: 0;
  font-size: 15px;
  border-bottom: 1px solid #e5e5e5;
  input {
    border: none;
    margin: 0;
    font-size: 15px;
    color: #9d9a9e;
  }
}
.nav-link {
  height: auto;
  width: auto;
  display: block;
  text-align: left;
  line-height: 30px;
  overflow: visible;
  white-space: nowrap;
  font-size: 14px;
  z-index: 0;
  padding: 10px 0;
  li {
    display: block;
    height: auto;
    line-height: 46px;
    margin: 0 40px;
  }
}
.el-col {
  padding-bottom: 10px;
  img {
    width: 100%;
  }
}
</style>