<template>
  <div>
    <div class="portrait" @click="$router.push('/personal')">
      <el-col :span="24">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar :size="70" :src="circleUrl"></el-avatar>
            <div class="mine-name">
              <p>{{username}}</p>
              <span>经验值{{grade}}分</span>
            </div>
          </div>
        </div>
      </el-col>
    </div>
    <div class="order">
      <h4>
        <i class="el-icon-notebook-1"></i>
        <span>我的订单</span>
      </h4>
      <ul>
        <li>
          <i class="el-icon-date"></i>
          <span>全部订单</span>
        </li>
        <li>
          <i class="el-icon-bank-card"></i>
          <span>待付款</span>
        </li>
        <li>
          <i class="el-icon-truck"></i>
          <span>待收货</span>
        </li>
        <li>
          <i class="el-icon-finished"></i>
          <span>已完成</span>
        </li>
      </ul>
    </div>
    <div
      class="information"
      v-for="(item,idx) in information"
      :key="item.title"
      @click="(idx == 1?$router.push('/personal'):'')"
    >
      <h4>
        <span>
          <i :class="item.icon"></i>
          <em>{{item.title}}</em>
        </span>
        <span>
          {{item.title2}}
          <i class="el-icon-arrow-right"></i>
        </span>
      </h4>
    </div>
    <p class="offlogin" @click="offlogin">退出当前登录</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      username: this.$store.state.common.user.username,
      grade: 0,
      information: [
        {
          icon: "el-icon-success",
          title: "会员等级",
          title2: "普通会员"
        },
        {
          icon: "el-icon-user-solid",
          title: "个人资料",
          title2: ""
        },
        {
          icon: "el-icon-s-claim",
          title: "安全设置",
          title2: ""
        },
        {
          icon: "el-icon-location-outline",
          title: "收货地址",
          title2: ""
        }
      ]
    };
  },
  methods: {
    offlogin() {
      this.$store.commit("logout");
      this.$router.push("/home");
    }
  }
};
</script>
<style lang="scss">
body {
  background-color: #eeeff0;
}
.portrait {
  height: 100px;
  .el-col {
    padding: 15px;
    height: 100px;
    background: #fff;
    color: #777777;
    .demo-basic--circle {
      width: 100%;
      .block {
        display: flex;
        .mine-name {
          padding: 10px;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
}
.order {
  margin: 15px 0px;
  background: #fff;
  font-size: 14px;
  color: #777777;
  h4 {
    padding: 15px;
    i {
      margin-right: 5px;
    }
  }
  ul {
    padding: 15px;
    width: 100%;
    display: flex;
    border-top: 1px solid #999;
    li {
      width: 25%;
      height: 50px;
      font-size: 14px;
      color: #777777;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      i {
        font-size: 24px;
        width: 24px;
        display: block;
      }
      span {
        display: block;
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
}
.information {
  background: #fff;
  border-top: 1px solid #999;
  h4 {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    color: #777777;
    i {
      margin-right: 5px;
    }
  }
}
.offlogin {
  margin-bottom: 65px;
  margin-top: 15px;
  background: #fff;
  padding: 15px;
  text-align: center;
  color: #777777;
}
</style>
