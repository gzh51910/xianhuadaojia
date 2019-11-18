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
      restaurants: [],
      state: "",
      timeout: null,
      shuju: []
      // gg: {}
    };
  },
  methods: {
    goBack() {
      // history.go(-1);
      this.$router.back();
    },
    //服务器
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" }
        // { value: "三鲜食（北新", address: "2222" }
      ];
    },
    querySearchAsync(queryString, cb) {
      // let {
      //   data: { data }
      // } = await my.get("/goods/sss", {
      //   query: queryString
      // });
      // let gg = [];
      // data.map(item => {
      //   gg.push(`{value:"${item.title}",address:"${item.gid}"}`);
      // });
      // this.shuju = gg;
      this.gg123 = [{ address: "123", value: "3333" }];
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      console.log(results);

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(this.gg123);
      }, 0 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
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
  }
  // created() {
  //   this.$router.push("/Advertising");
  // },
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
  z-index: 3001;
  position: absolute;
  height: 45%;
  top: 0;
}
.ggimg1 {
  width: 100%;
  z-index: 3001;
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
</style>
