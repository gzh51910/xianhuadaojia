<template>
    <div>
        <div class="false-form" v-if="goodsnum == goodslength">
            <i class="el-icon-goods"></i>
            <p>您的购物车还没有商品，快去挑选心爱的商品吧！</p>
            <el-button type="danger" class="cart-go" @click="$router.push('/home')">去逛逛</el-button>
        </div>
        <div class="cart-main">
            <div class="cart-operation">
                <el-checkbox v-model="checkall">全选</el-checkbox>
                <span class="alldel" @click="clearCart">全部删除</span>
            </div>
            <ul class="cart-li">
                <li v-for="item in goodslist" :key="item.gid">
                    <div class="li-left">
                        <el-checkbox v-model="checkall" class="onecheck"></el-checkbox>
                        <div class="cart-image">
                            <img :src="item.url" alt />
                        </div>
                        <span class="cartname">{{item.title}}</span>
                    </div>
                    <div class="li-right">
                        <span class="pirce">{{item.price}}</span>
                        <i class="el-icon-delete" @click="removeItem(item.gid,item.userid)"></i>
                        <el-input-number
                            v-model="item.qty"
                            size="mini"
                            :min="1"
                            :max="item.inventory*1"
                            @change="handleChange(item.qty,item.gid,item.userid)"
                        ></el-input-number>
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
import { mapState } from "vuex";
import { my } from "../api";
export default {
    data() {
        return {
            checkall: false,
            goodsnum: 0
        };
    },
    computed: {
        ...mapState({
            goodslist(state) {
                return state.cart.goodslist;
            },
            goodslength(state) {
                return state.cart.goodslength;
            }
        }),
        totalPrice() {
            return this.goodslist.reduce(
                (prev, item) => prev + item.price.substr(1) * item.qty,
                0
            );
        }
    },
    methods: {
        async removeItem(id, gid) {
            let result = await my.patch("/cart/del", { id, gid });
            if (result.data.status == 1) {
                this.$store.dispatch("po", gid);
            }
        },
        async handleChange(value, id, gid) {
            let result = await my.patch("/cart/upda", { value, id, gid });
            if (result.data.status == 1) {
                this.$store.dispatch("po", gid);
            }
        },
        async clearCart() {
            let id = this.$store.state.common.user._id;
            let result = await my.patch("/cart/delall", { id });
            if (result.data.status == 1) {
                this.$store.dispatch("po", id);
                this.goodsnum = 0;
            }
        }
    },
    beforeCreate() {
        let a = this.$store.state.common.user._id;
        this.$store.dispatch("po", a);
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