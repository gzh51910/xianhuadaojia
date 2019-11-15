<template>
  <div>
    
  </div>
</template>
<script>
import { my } from "../api";
export default {
  data() {
    return {
      drawer: false,
      direction: "ltr",
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
          name: "materials",
          path: "/materials",
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
    } = await my.get("/user/ddd", {
      query: "Brand_zone"
    });
    this.datalist = data;
  }
};
</script>
<style lang="scss">
// .el-scrollbar__wrap {
//   overflow-x: hidden;
// }
//<el-scrollbar style="height:100%">
.el-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  background-color: #ffffff;
  z-index: 1;
}
.el-main {
  padding-top: 23%;
  width: 100%;
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
