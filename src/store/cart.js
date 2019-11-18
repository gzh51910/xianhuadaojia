import {
  my
} from "../api";
export default {
  // 设置命名空间
  // namespaced: true,

  state: {
    goodslist: [],
    goodslength: 0
  },
  actions: {
    async po(context, id) {
      let {
        data: {
          data
        }
      } = await my.get("cart", {
        userid: id
      });
      context.state.goodslength = data.length;
      context.state.goodslist = data;
    }
  }
};