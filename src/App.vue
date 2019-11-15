<template>
  <div class="container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#fff"
      active-text-color="#f17f7e"
      router
    >
      <el-menu-item
        :index="item.path"
        v-for="item in menu"
        :key="item.name"
        :class="item.icon"
      >{{item.text}}</el-menu-item>
    </el-menu>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
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
        // {
        //   name: "reg",
        //   path: "/reg",
        //   text: "注册"
        // },
        // {
        //   name: "login",
        //   path: "/login",
        //   text: "登录"
        // }
      ]
    };
  },
  // methods: {
  //   //用了ElementUI集成的router就可以不用这个了
  //   goto(path) {
  //     // this.$router.push(path);
  //     // router.push()     跳转页面并留下浏览记录
  //     // router.replace()  跳转页面，不保留任何浏览记录
  //     //通过路由名称跳转,对象命名可以传参
  //     this.$router.push(path);
  //   }
  // },
  created() {
    this.activeIndex = this.$route.path;
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
.container {
  height: 100vh;
  overflow-x: hidden;
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
</style>
