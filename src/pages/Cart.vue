<template>
    <div>
        <div class="false-form">
            <i class="el-icon-goods"></i>
            <p>您的购物车还没有商品，快去挑选心爱的商品吧！</p>
            <el-button type="danger" class="cart-go" @click="$router.push('/home')">去逛逛</el-button>
        </div>
    </div>
</template>
<script>
export default {};
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
</style>