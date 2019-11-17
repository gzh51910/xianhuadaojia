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
    <div v-bind:class="{ qinjun1: isSeek,search:!isSeek }">
      <i class="el-icon-arrow-left houtui"></i>
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
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
      isActive: false,
      isSeek: false,
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
      ],
      restaurants: [],
      state: "",
      timeout: null
    };
  },
  methods: {
    //服务器
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
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
</style>
