<template>
  <div style="border-color: #eeeeee;">
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
      <h3>如初</h3>
      <div class="product-description">
        花 材：11枝红玫瑰搭配满天星，栀子叶花束
        <br />
        <br />花 语：人生若只如初见
        <br />
        <br />附 送：免费附送精美贺卡，代写祝福。(您下单时可填写留言栏)
        <br />
        <br />配送范围：全国 （可配送至全国1000多城市，市区免配送费）
      </div>
      <div class="product-price">
        <strong>
          ￥
          <span>139.00</span>
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
    </div>
    <el-drawer :visible.sync="drawer" :direction="direction">
      <div class="product-mobi-title">
        <img
          src="//asset.ibanquan.com/image/59a4d4a5b1b9572079000d8a/s_w480h480.jpeg?v=1503974565"
          class="product-mobi-img"
        />
        <h2 class="product-title">如初</h2>
        <div class="product-price">
          <strong class="price_color">
            ￥
            <span class="settings-color">139</span>
          </strong>
          <span class="product-sold">
            已售出
            <span>71</span>件
          </span>
        </div>
      </div>
      <div class="product-quantity">
        <h3>购买数量</h3>
        <el-input-number size="mini" v-model="num" @change="handleChange" :min="1" :max="999"></el-input-number>
        <div class="product-quantity-desc">
          （库存
          <span>929</span>件）
        </div>
      </div>
      <div class="cart">
        <el-button type="danger" round>加入购物车咯</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { slider, slideritem } from "vue-concise-slider";
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
      this.$router.go(-1);
    },
    goHome(path) {
      this.$router.push(path);
    },
    handleChange(value) {
      console.log(value);
    }
  }

//  async created() {
//     let { id } = this.$route.params;

//     let data = await this.axios.get(
//       "https://www.nanshig.com/mobile/index.php",
//       {
//         params: {
//           act: "goods",
//           op: "goods_detail",
//           goods_id: id,
//           key: ""
//         }
//       }
//     );
//     console.log(data);
    }
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
.el-menu.el-menu--horizontal {
  display: none;
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
  height: 50px;
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
</style>
