import { my } from "../api";
export default {
  // 设置命名空间
  // namespaced: true,

  state: {
    goodslist: []
  },

  getters: {
    totalPrice(state) {
      return state.goodslist.reduce((prev, item) => {
        let num = item.price.substr(1) * 1;
        prev + num * item.qty;
        console.log(prev + num * item.qty);
        
      }, 0);
    }
  },
  mutations: {
    // 删除单个商品
    // state:上面的state
    // payload:触发mutation时传入的参数
    // async po(state, id) {
    //   console.log(id);

    //   // let {data: { data }} = await my.get("cart", { userid: id });
    //   // let datalist = data.splice(-1, 1);
    //   // console.log("未截串", data);
    //   // console.log("截串", datalist);

    //
    // },
    Po(state, data) {
      state.goodslist = data;
    },
    removeFromCart(state, id) {
      state.goodslist = state.goodslist.filter(item => item.id != id);
    },

    // 清空购物车
    clearCart(state) {
      state.goodslist = [];
    },

    // 添加到购物车
    addToCart(state, goods) {
      state.goodslist.unshift(goods);
    },

    // 修改数量
    changeQty(state, payload) {
      state.goodslist.forEach(item => {
        if (item.id === payload.id) {
          item.qty = payload.qty;
        }
      });
    }
  },
  actions: {
    // context: 一个类似于store的对象
    // payload: 触发action时传入的参数
    async po(context, id) {
      let {
        data: { data }
      } = await my.get("cart", { userid: id });
      context.commit("Po", data);
    }
  }
};
