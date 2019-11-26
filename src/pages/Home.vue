<template>
  <el-container class="wraper" v-if="datalist[0]">
    <div class="box">
      <el-header height="auto" ref="elememt">
        <i class="el-icon-d-arrow-right nemu" @click="drawer = true" type="primary"></i>
        <div class="logo">
          <img src="//asset.ibanquan.com/s/41222/403/logo?v=1543823931_1547108401" />
        </div>
        <div class="user">
          <i class="el-icon-user" style="margin-right:10px" @click="goHome('Mine')"></i>
          <i class="el-icon-shopping-cart-full" @click="goHome('cart')">
            <span>{{goodslength}}</span>
          </i>
        </div>
        <el-drawer :visible.sync="drawer" :direction="direction" size="65%">
          <div style="border-bottom: 1px solid #e5e5e5;">
            <img
              class="imglogo"
              src="//asset.ibanquan.com/s/41222/403/logo?v=1543823931_1547108401"
            />
          </div>
          <div type="text" class="sousuo">
            <i class="el-icon-search" style="margin-right: 10px;" @click="goHome('/seek')"></i>
            <input type="text" placeholder="搜索全店" v-model="value" filterable />
          </div>
          <div>
            <div class="nav-link">
              <li
                v-for="item in menu"
                :key="item.name"
                :index="item.path"
                :class="item.icon"
                @click="goHome(item.path)"
              >{{item.text}}</li>
            </div>
          </div>
        </el-drawer>
      </el-header>
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
import { mapState } from "vuex";
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
      value: "",
      datalist: []
    };
  },
  computed: {
    ...mapState({
      goodslength(state) {
        return state.cart.goodslength;
      }
    })
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
      query: "index"
    });
    this.datalist = data;
    this.$parent.renwu();
    // this.$parent.gg("俺爱你");
  }
};
</script>
<style lang="scss">
//隐藏滚动条
// .el-scrollbar__wrap {
//   overflow-x: hidden;
// }
//<el-scrollbar style="height:100%">
.goodname {
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.goodprice {
  color: red;
}
.el-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  background-color: #ffffff;
  z-index: 1;
}
.box {
  .el-main {
    padding-top: 23%;
    width: 100%;
    padding-bottom: 16%;
  }
}
.nemu {
  margin: 30px 0 0 -5px;

  &::before {
    font-size: 24px;
  }
}
.logo {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  float: none;
  line-height: 80px;
  font-size: 30px;
  img {
    max-height: 100%;
    vertical-align: middle;
    max-width: 100%;
    width: 100%;
  }
}
.imglogo {
  max-height: 100%;
  vertical-align: middle;
  max-width: 100%;
  position: absolute;
  top: 1%;
  width: 80%;
}
.user {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(-30%, -50%);
  font-size: 17px;
  i:nth-child(2) {
    span {
      color: red;
    }
  }
}
.wraper {
  height: 100vh;
  overflow-x: hidden;
}
.box {
  width: 100%;
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