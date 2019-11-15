<template>
    <div class="main-contact">
        <h4></h4>
        <span>社交登录</span>
        <div class="Wechat">
            <i class="iconfont iconweixin-copy"></i>
            <i class="iconfont iconqq-copy"></i>
            <i class="iconfont iconweibo"></i>
            <i class="iconfont iconwangyi"></i>
            <i class="iconfont iconrenrenwang"></i>
        </div>
    </div>
</template>
<script>
export default {
    
};
</script>
<style lang="scss">
.main-contact {
    margin-top: 40px;
    padding: 0px 15px;
    position: relative;
    h4 {
        border: 0.5px solid #999;
        font-size: 14px;
    }
    span {
        font-weight: 400;
        display: inline-block;
        margin-bottom: 0;
        padding: 0 10px;
        background-color: #eeeff0;
        text-align: center;
        color: #999;
        position: absolute;
        left: 40%;
        top: -12px;
    }
    .Wechat {
        margin-top: 18px;
        text-align: center;
        i {
            font-size: 40px;
            color: #999;
            margin: 0px 5px;
        }
    }
}
</style>