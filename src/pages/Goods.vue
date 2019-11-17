<template>
  <div style="border-color: #eeeeee;" v-if="message.gid">
    <div>
      <el-button
        icon="el-icon-arrow-left"
        circle
        @click="goBack"
        style="position: absolute;left: 3%;top: 4%;z-index: 9;"
      ></el-button>
      <el-button
        icon="el-icon-shopping-cart-full"
        circle
        @click="goHome('/cart')"
        style="position: absolute;right: 3%;top: 4%;z-index: 9;"
      ></el-button>
    </div>
    <div style="width:100%;height:350px">
      <slider ref="slider" :options="options1">
        <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
      </slider>
    </div>
    <div style="padding: 10px 5%;">
      <h3>{{message.title}}</h3>
      <div class="product-description" v-html="message.says"></div>
      <div class="product-price">
        <strong>
          <span>{{message.price}}</span>
        </strong>
      </div>
    </div>
    <div class="product-shink-option" @click="drawer = true" type="primary">
      选择商品型号尺寸
      <i class="el-icon-arrow-right"></i>
    </div>
    <div>
      <div style="text-align: center;color: palevioletred;">商品推荐</div>
      <div style="width:100%;height:100px">
        <slider ref="slider" :options="options">
          <slideritem v-for="(item,index) in someList1" :key="index" :style="item.style">
            <div class="sptj">
              <div style>一生相伴</div>
              <div>￥269.00</div>
            </div>
          </slideritem>
        </slider>
      </div>
    </div>
    <div class="presentation">
      <el-radio-group v-model="radio1" text-color="#999999" fill="#e7284d">
        <el-radio-button label="商品简介"></el-radio-button>
        <el-radio-button label="商品评论"></el-radio-button>
      </el-radio-group>
      <div class="product-intro">
        <img src="//asset.ibanquan.com/image/588442143f8f9009880009c8/s.jpeg?v=1485062676" />
        <br />
        <img src="//asset.ibanquan.com/image/588442160dd76c1c930009a2/s.jpeg?v=1485062678" />
        <br />
        <img src="//asset.ibanquan.com/image/588442183f8f9009880009cb/s.jpeg?v=1485062680" />
        <br />
        <img src="//asset.ibanquan.com/image/5884421ab1b95714230009a8/s.jpeg?v=1485062683" />
      </div>
    </div>
    <div class="footer">
      <ul class="footer-1">
        <li>公司介绍</li>
        <li>关于我们</li>
        <li>品牌故事</li>
      </ul>
      <ul class="footer-2">
        <li style="margin-right: 10%;">
          <el-button type="info" round>QQ客服</el-button>
        </li>
        <li>
          <el-button type="info" round>微信客服</el-button>
        </li>
      </ul>
      <div class="footer-3">© 2015 xianhuadaojia.com All rights reserved. Powered by xiaohuatech.</div>
      <div class="footer-4">
        <i class="iconfont iconweixinzhifu2" title="微信支付"></i>
        <i class="iconfont iconzhifubaozhifu" title="支付宝"></i>
        <i class="iconfont iconcaifutong" title="财付通"></i>
        <i class="iconfont iconkuaiqian-copy" title="快钱"></i>
        <i class="iconfont iconhuodaofukuan" title="货到付款"></i>
        <i class="el-icon-bank-card" title="银行卡"></i>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :direction="direction">
      <div class="product-mobi-title">
        <img :src="message.url" class="product-mobi-img" />
        <h2 class="product-title">{{message.title}}</h2>
        <div class="product-price">
          <strong class="price_color">
            <span class="settings-color">{{message.price}}</span>
          </strong>
          <span class="product-sold">
            已售出
            <span>{{message.sell}}</span>件
          </span>
        </div>
      </div>
      <div class="product-quantity">
        <h3>购买数量</h3>
        <el-input-number size="mini" v-model="num" @change="handleChange" :min="1" :max="999"></el-input-number>
        <div class="product-quantity-desc">
          （库存
          <span>{{message.inventory}}</span>件）
        </div>
      </div>
      <div class="cart">
        <el-button type="danger" round>加入购物车咯</el-button>
      </div>
    </el-drawer>
    <div class="addCart">
      <el-button type="danger" round>加入购物车♂</el-button>
    </div>
  </div>
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
import { slider, slideritem } from "vue-concise-slider";
import { my } from "../api";
export default {
  name: "app",
  data() {
    return {
      radio1: "商品简介",
      drawer: false,
      direction: "btt",
      num: 1,
      someList: [],
      someList1: [],
      message: "",
      messageimg: [],
      options1: {
        currentPage: 0,
        thresholdDistance: 100,
        thresholdTime: 500,
        autoplay: false,
        loop: true,
        // direction: "vertical",
        loopedSlides: 1,
        slidesToScroll: 1,
        timingFunction: "ease",
        speed: 300
      },
      options: {
        infinite: 3,
        slidesToScroll: 3,
        currentPage: 0,
        thresholdDistance: 100,
        thresholdTime: 500,
        autoplay: false,
        loop: true,
        loopedSlides: 3,
        timingFunction: "ease",
        speed: 300,
        pagination: false
      }
    };
  },
  components: {
    slider,
    slideritem
  },
  mounted() {
    let that = this;
    setTimeout(function() {
      that.someList = [
        {
          style: {
            background:
              'url("//asset.ibanquan.com/image/59a4d4a70dd76c3e3f000e40/s_w480h480.jpeg?v=1503974568")left/100% 100%'
          }
        },
        {
          style: {
            background:
              'url("//asset.ibanquan.com/image/59a4d4a53f8f90227a000c9d/s_w480h480.jpeg?v=1503974565")left/100% 100%'
          }
        },
        {
          style: {
            background:
              'url("//asset.ibanquan.com/image/59a4d4a5b1b9572079000d8a/s_w480h480.jpeg?v=1503974565")left/100% 100%'
          }
        }
      ];
      that.someList1 = [
        {
          style: {
            background:
              'url("//asset.ibanquan.com/image/5b5889e820663d15db000b71/s.jpeg?v=1532529128")left/100% 100%',
            width: "33%"
          }
        },
        {
          style: {
            background:
              'url("//asset.ibanquan.com/image/5b5889e820663d15db000b71/s.jpeg?v=1532529128")left/100% 100%',
            width: "33.3%"
          }
        },
        {
          style: {
            background:
              'url("//asset.ibanquan.com/image/5b5889e820663d15db000b71/s.jpeg?v=1532529128")left/100% 100%',
            width: "33.3%"
          }
        }
      ];
    }, 0);
  },
  methods: {
    goBack() {
      history.go(-1);
    },
    goHome(path) {
      this.$router.push(path);
    },
    handleChange(value) {
      console.log(value);
    }
  },
  async beforeCreate() {
    let {
      data: { data }
    } = await my.get("/goods/id", {
      id: this.$route.params.id
    });
    this.message = data[0];
    console.log(this.message);

    //轮播图
    // data[0].imgs
    //   .slice(1, -1)
    //   .split(",")
    //   .map(item => {
    //   });
    // console.log(this.messageimg);
    // let data1 = await my.get("/goods/ddd", {
    //   query: "Brand_zone"
    // });
    // this.datalist = data;
  }
};
</script>
<style lang="scss">
.el-carousel {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-carousel__arrow {
  display: none;
}
.el-carousel__indicators--horizontal {
  display: none;
}
h3 {
  margin-top: 10px;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
}
.product-description {
  font-size: 12px;
  line-height: 18px;
  margin-top: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
  color: #999999;
}
.product-price {
  font-size: 16px;
  padding: 10px 0;
  border-bottom: none;
  line-height: 16px;
  height: auto;
  strong {
    color: #e7284d;
    font-weight: 700;
  }
}
.product-shink-option {
  line-height: 50px;
  padding: 0 5%;
  font-size: 14px;
  border-width: 8px 0;
  border-style: solid;
  border-color: #eeeeee;
  color: #999999;
  i {
    float: right;
    font-size: 30px;
    font-weight: 900;
    padding-top: 10px;
  }
}
.product-mobi-title {
  padding: 14px 12% 8px 5%;
  overflow: hidden;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #eeeeee;
  position: absolute;
  top: 0;
  width: 100%;
  img {
    width: 40px;
    height: 40px;
    vertical-align: top;
    margin-right: 10px;
    float: left;
  }
  .product-title {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 18px;
    margin: 0;
    max-width: 74%;
    display: inline-block;
    color: #333333;
    font-weight: normal;
  }
  .product-price {
    font-size: 14px;
    margin-left: 46px;
    margin-top: 0;
    line-height: 18px;
    height: 18px;
    padding: 0;
    border-bottom: none;
    .price_color {
      color: #e7284d;
      font-weight: 700;
    }
  }
  .product-sold {
    font-size: 12px;
    float: right;
    margin-right: 20px;
    color: #999999;
  }
}
.el-drawer__close-btn {
  z-index: 1;
}
.product-quantity {
  padding: 10px 5%;
  color: #999999;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 20px;
  h3 {
    display: inline-block;
    margin-top: 0;
  }
  .el-input-number--mini {
    float: right;
  }
  .product-quantity-desc {
    font-size: 12px;
    float: right;
    color: #999999;
    padding-top: 5px;
  }
}
.cart {
  padding: 14px 0;
  width: 100%;
  margin-bottom: 0;
  text-align: center;
  .el-button.is-round {
    border-radius: 20px;
    padding: 12px 34%;
  }
}
.sptj {
  font-size: 10px;
  position: absolute;
  bottom: 5%;
  div:nth-child(2) {
    color: rgb(231, 40, 77);
  }
}
.presentation {
  line-height: 50px;
  padding: 0px 5%;
  font-size: 14px;
  border-width: 8px 0;
  border-style: solid;
  border-color: #eeeeee;
  color: #999999;
  margin-top: 10px;
}
.el-radio-group {
  width: 100%;
  display: flex;
  margin-top: 2%;
}
.el-radio-button {
  flex: 1;
}
.el-radio-button__inner {
  width: 100%;
}
.product-intro {
  font-size: 14px;
  border-top: 0;
  padding: 10px;
  img {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    vertical-align: middle;
  }
}
.footer {
  background-color: #f5f5f5;
  .footer-1 {
    width: 90%;
    max-width: 90%;
    margin: 0 5%;
    padding: 20px 0 10px;
    border-bottom: 1px solid #dfdfdf;
    text-align: center;
    li {
      display: inline-block;
      margin: 0;
      width: 33.33%;
      text-align: center;
      min-width: 50px;
      max-width: 112px;
      vertical-align: top;
      font-size: 15px;
      color: #333333;
      font-weight: 900;
    }
  }
  .footer-2 {
    float: none;
    width: 100%;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    li {
      margin: 20px 0 14px;
      width: 104px;
      height: 32px;
      line-height: 32px;
      border-radius: 3px;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      text-align: center;
      font-size: 12px;
      display: inline-block;
      margin: 10px 0 12px;
    }
  }
  .footer-3 {
    width: 100%;
    text-align: center;
    height: auto;
    font-size: 12px;
    margin-bottom: 12px;
    line-height: 24px;
    display: inline-block;
    color: #777777;
    vertical-align: middle;
    word-break: break-word;
    padding: 3% 6% 0%;
  }
  .footer-4 {
    text-align: center;
    width: 100%;
    height: auto;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    color: #9e9e9e;
    font-size: 12px;
    margin-bottom: 20%;
    i {
      font-size: 24px;
      padding: 4px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
    }
  }
}
.addCart {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 6px 0;
  z-index: 1;
  border-top: 1px solid #eeeeee;
  background-color: #ffffff;
  .el-button.is-round {
    padding: 3% 24%;
  }
}
</style>
