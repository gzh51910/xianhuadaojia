<template>
  <div class="container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#fff"
      active-text-color="#f17f7e"
      background-color="#545c64"
      router
      v-bind:class="{ qinjun: isActive }"
    >
      <el-menu-item
        :index="item.path"
        v-for="item in menu"
        :key="item.name"
        :class="item.icon"
      >{{item.text}}</el-menu-item>
    </el-menu>
    <div v-bind:class="{ qinjun1: isSeek,search:!isSeek }" class="ssk">
      <i class="el-icon-arrow-left houtui" @click="goBack()"></i>
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入关键词"
        @select="handleSelect"
        clearable
      ></el-autocomplete>
      <i class="iconfont iconliebiao" style="position: absolute;right: 4%;font-size: 27px;"></i>
    </div>
    <main>
      <router-view />
    </main>
    <div class="circle_bot" v-if="qj">
      <span class="s_b">
        <b class="b1"></b>
        <b class="b2"></b>
      </span>
      <div class="info">{{tishi}}</div>
      <span class="s_b">
        <b class="b2"></b>
        <b class="b1"></b>
      </span>
      <span class="s_i">
        <i class="i6"></i>
        <i class="i5"></i>
        <i class="i4"></i>
        <i class="i3"></i>
        <i class="i2"></i>
        <i class="i1"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { my } from "./api";
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
      isActive: false,
      isSeek: false,
      gg123: "",
      tishi: "",
      qj: false,
      kaiqi: true,
      daohang: [
        "lover",
        "friend",
        "elder",
        "immortal",
        "mmaterials",
        "subscription",
        "brand",
        "business",
        "seek"
      ],
      menu: [
        {
          name: "home",
          path: "/home",
          text: "首页",
          icon: "el-icon-s-home"
        },
        {
          name: "recommend",
          path: "/recommend",
          text: "推荐",
          icon: "el-icon-present"
        },
        {
          name: "message",
          path: "/message",
          text: "消息",
          icon: "el-icon-chat-dot-round"
        },
        {
          name: "cart",
          path: "/cart",
          text: "购物车",
          icon: "el-icon-shopping-cart-2"
        },
        {
          name: "mine",
          path: "/mine",
          text: "我的",
          icon: "el-icon-s-custom"
        }
      ],
      state: "",
      timeout: null,
      shuju: []
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async querySearchAsync(queryString, cb) {
      if (queryString) {
        let {
          data: { data }
        } = await my.get("/goods/sss", {
          query: queryString
        });
        let gg = [];
        data.map(item => {
          gg.push({ value: item.title, address: item.gid });
        });
        this.shuju = gg;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.shuju);
        }, 0 * Math.random());
      }
    },
    handleSelect(item) {
      let id = item.address;
      this.$router.push({ name: "goods", params: { id } });
    },
    gg(xx) {
      let qj = this;
      this.qj = true;
      this.tishi = xx;
      setTimeout(() => {
        qj.qj = false;
      }, 3500);
    },
    renwu() {
      if (this.kaiqi) {
        setTimeout(() => {
          window.L2Dwidget.init({
            pluginRootPath: "live2dw/",
            pluginJsPath: "lib/",
            pluginModelPath: "live2d-widget-model-wanko/assets/",
            tagMode: false,
            debug: false,
            model: {
              jsonPath:
                "/live2dw/live2d-widget-model-wanko/assets/wanko.model.json"
            },
            display: { position: "lelt", width: 150, height: 300, top: 100 },
            mobile: { show: true },
            log: false
          });
        }, 0);
        this.kaiqi = false;
        setTimeout(() => {
          this.gg("小老弟，来买花啦？");
        }, 500);
      }
    }
  },
  beforeUpdate() {
    //判断显示隐藏
    let pd = this.$route.path.slice(1, 15);
    if (pd.match(RegExp(/goods/))) {
      this.isActive = true;
    } else if (pd.match(RegExp(/dvertising/))) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
    for (let i = 0; i < this.daohang.length; i++) {
      if (pd != this.daohang[i]) {
        this.isSeek = true;
      } else {
        this.isSeek = false;
        return;
      }
    }
  },
  created() {
    this.$router.push("/Advertising");
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
}

a {
  text-decoration: none;
  color: #666666;
}

address,
cite,
dfn,
optgroup,
em,
var,
b,
i {
  font-style: normal;
  font-weight: normal;
}
.container .el-menu-demo {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 999;
  text-align: center;
}
.el-menu-demo li {
  flex: 1;
  padding: 0;
}
.container {
  height: 100vh;
  overflow-x: hidden;
  position: relative;
  .qinjun {
    display: none;
  }
  .qinjun1 {
    display: none;
  }
}
.price {
  del {
    color: #999;
    margin-right: 5px;
    &::before {
      content: "￥";
    }
  }
  span {
    color: red;
  }
}
.goodsname {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.8rem;
}
.commodity {
  margin-top: 5px;
}
.good_box {
  margin-top: 10px;
}
.logxx {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-end;
  box-sizing: border-box;
  .el-button {
    padding: 7px 0px;
  }
}
.el-menu-demo {
  li {
    background-color: #999;
  }
}
.search {
  height: 8%;
  background: #f56c6c;
  display: flex;
  justify-content: center;
  align-items: center;
}
.houtui {
  position: absolute;
  left: 3%;
  font-size: 36px;
}
.el-autocomplete {
  .el-input {
    font-size: 20px;
  }
}
.ggimg {
  width: 100%;
  z-index: 100000;
  position: absolute;
  height: 45%;
  top: 0;
}
.ggimg1 {
  width: 100%;
  z-index: 100000;
  position: absolute;
  height: 41%;
  bottom: -2%;
}
.box1 {
  width: 100%;
  .el-main {
    padding-top: 19%;
    padding-bottom: 17%;
  }
}
.ssk {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
}
#live2dcanvas {
  top: 5% !important;
  left: -20% !important;
}
/*提示圆角框*/
.circle_bot {
  clear: both;
  font: 12px/1.125 Arial;
  width: 50%;
  z-index: 99999;
  position: fixed;
  left: 0;
  bottom: 20%;
}

.circle_bot .s_b b,
.circle_bot span.s_i i {
  font-size: 1px;
  line-height: 1px;
  overflow: hidden;
  display: block;
  clear: both;
}

.circle_bot .s_b b,
.circle_bot span.s_i i,
.circle_bot .info {
  background: #fff2f2;
  border: #f88 solid;
}

.circle_bot b.b1 {
  border-width: 1px 0 0 0;
  margin: 0 2px;
  height: 0px;
}

.circle_bot b.b2 {
  border-width: 0 1px;
  margin: 0 1px;
  height: 1px;
}

.circle_bot span.s_i i {
  height: 1px;
  border-width: 0 1px;
}

.circle_bot .i1 {
  width: 0px;
  margin-left: 36px;
}

.circle_bot .i2 {
  width: 2px;
  margin-left: 35px;
}

.circle_bot .i3 {
  width: 4px;
  margin-left: 34px;
}

.circle_bot .i4 {
  width: 6px;
  margin-left: 33px;
}

.circle_bot .i5 {
  width: 8px;
  margin-left: 32px;
}

.circle_bot .i6 {
  width: 10px;
  margin-left: 31px;
  margin-top: -1px;
}

.circle_bot .info {
  border-width: 0 1px;
  color: #333;
  padding: 10px;
}

/*浅黄边白底*/
div.circle_yellow {
  clear: both;
}

div.circle_yellow .s_b b,
div.circle_yellow .s_i i,
div.circle_yellow .info {
  background: #fff;
  border-color: #db9;
}
</style>
