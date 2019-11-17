import { my } from "../api";
export default {
  // 设置命名空间
  // namespaced: true,

  state: {
    goodslist: []
  },
  mutations: {
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
