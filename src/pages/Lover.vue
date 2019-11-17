<template>
  <el-container class="wraper" v-if="datalist[0]">
    <div class="box1">
      <el-main style="margin-bottom:15%">
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
      menu: [
        {
          name: "lover",
          path: "/lover",
          text: "送恋人",
          icon: "el-icon-s-home"
        },
        {
          name: "friend",
          path: "/friend",
          text: "送朋友",
          icon: "el-icon-s-home"
        },
        {
          name: "elder",
          path: "/elder",
          text: "送长辈",
          icon: "el-icon-s-home"
        },
        {
          name: "immortal",
          path: "/immortal",
          text: "永生花",
          icon: "el-icon-s-home"
        },
        {
          name: "mmaterials",
          path: "/mmaterials",
          text: "进口材料",
          icon: "el-icon-s-home"
        },
        {
          name: "subscription",
          path: "/subscription",
          text: "鲜花订阅",
          icon: "el-icon-s-home"
        },
        {
          name: "brand",
          path: "/brand",
          text: "品牌专区",
          icon: "el-icon-s-home"
        },
        {
          name: "business",
          path: "/business",
          text: "商务用花",
          icon: "el-icon-s-home"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
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
      query: "Brand_zone"
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

.wraper {
  height: 100vh;
  overflow-x: hidden;
}
.box1 {
  width: 100%;
  .el-main {
    padding-top: 2%;
  }
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