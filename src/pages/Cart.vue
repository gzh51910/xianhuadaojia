<template>
    <div>
        <div class="false-form" v-if="goodsnum == 0">
            <i class="el-icon-goods"></i>
            <p>您的购物车还没有商品，快去挑选心爱的商品吧！</p>
            <el-button type="danger" class="cart-go" @click="$router.push('/home')">去逛逛</el-button>
        </div>
        <div class="cart-main" v-else>
            <div class="cart-operation">
                <el-checkbox v-model="checkall">全选</el-checkbox>
                <span class="alldel" @click="clearCart">全部删除</span>
            </div>
            <ul class="cart-li">
                <li v-for="item in goodslist" :key="item._id">
                    <div class="li-left">
                        <el-checkbox v-model="checkall" class="onecheck"></el-checkbox>
                        <div class="cart-image">
                            <img :src="item.url" alt />
                        </div>
                        <span class="cartname">{{item.title}}</span>
                    </div>
                    <div class="li-right">
                        <span class="pirce">{{item.price}}</span>
                        <i class="el-icon-delete" @click="removeItem(item._id)"></i>
                        <el-input-number v-model="item.qty" size="mini" :min="1" :max="10"></el-input-number>
                    </div>
                </li>
            </ul>
            <div class="cart-close">
                <el-button type="danger">确认结算</el-button>
                <div class="cart-pirce">
                    <em>合计:</em>
                    <span class="allpirce">{{totalPrice}}</span>
                    <p>(不含运费)</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            checkall: false,
            goodsnum: this.$store.state.cart.goodslist.length
        };
    },
    created() {
        let a = this.$store.state.common.user._id;
        this.$store.dispatch("po", a);
    },
    computed: {
        ...mapState({
            goodslist(state) {
                return state.cart.goodslist;
            }
        }),
        ...mapGetters(["totalPrice"])
    },
    methods: {
        ...mapMutations({
            removeItem: "removeFromCart",
            changeQty2: (commit, payload) => {
                // 其他额外操作
                commit("changQty", payload);
            }
        }),
        ...mapMutations(["clearCart", "changeQty"])
    }
};
</script>
<style lang="scss">
.false-form {
    width: 100%;
    margin-top: 60px;
    text-align: center;
    i {
        font-size: 112.5px;
    }
    p {
        font-size: 14px;
        color: #6e6e6e;
        margin: 30px 0;
    }
}
.cart-main {
    background: #eeeff0;
    .cart-operation {
        position: fixed;
        top: 0;
        left: 0;
        padding: 15px;
        width: 100%;
        border-bottom: 1px solid #d5d5d5;
        height: 8%;
        background: #fff;
        .alldel {
            margin-left: 10px;
            font-size: 12px;
            color: #999;
        }
    }
    .cart-li {
        margin-top: 14%;
        height: 80%;
        li {
            background: #fff;
            height: 118px;
            border-bottom: 0.5px solid #d5d5d5;
            padding: 6px 15px;
            display: flex;
            justify-content: space-between;
            .li-left {
                display: flex;
                width: 50%;
                align-items: center;
                .cart-image {
                    width: 70px;
                    height: 70px;
                    margin-left: 10px;
                    img {
                        width: 70px;
                        height: 70px;
                    }
                }
                .cartname {
                    font-size: 14px;
                    color: #777;
                }
            }
            .li-right {
                width: 50%;
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                justify-content: space-between;
            }
        }
    }
    .cart-close {
        background: #fff;
        position: fixed;
        bottom: 9%;
        left: 0;
        width: 100%;
        height: 60px;
        padding: 10px;
        border-top: 0.5px solid #d5d5d5;
        border-bottom: 0.5px solid #d5d5d5;
        display: flex;
        flex-direction: row-reverse;
        .cart-pirce {
            margin-right: 20px;
            .allpirce {
                font-size: 14px;
                color: #f71;
                font-weight: 700;
                margin-left: 10px;
            }
            p {
                font-size: 12px;
                color: #989898;
                text-align: right;
            }
        }
    }
}
</style>