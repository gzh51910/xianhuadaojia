<template>
    <div>
        <div class="portrait">
            <el-col :span="24">
                <div class="demo-basic--circle">
                    <span>头像</span>
                    <div class="topimg">
                        <el-avatar :size="70" :src="circleUrl"></el-avatar>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </el-col>
        </div>
        <div class="personal-main">
            <div
                class="information"
                v-for="item in information"
                :key="item.classes"
                @click="upMessage(item.classes)"
            >
                <h4>
                    <span>{{item.title}}</span>
                    <span>
                        {{item.title2}}
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            circleUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            username: "请登录账号",
            grade: 0,
            information: [
                {
                    title: "昵称",
                    title2: this.$store.state.common.user.username,
                    classes:'username'
                },
                {
                    title: "邮箱地址",
                    title2: this.$store.state.common.user.email,
                    classes:'email'
                },
                {
                    title: "手机号码",
                    title2: this.$store.state.common.user.phone,
                    classes:'phone'
                },
                {
                    title: "真实姓名",
                    title2: this.$store.state.common.user.realname,
                    classes:'realname'
                },
                {
                    title: "身份证号码",
                    title2: this.$store.state.common.user.idnumben,
                    classes:'idnumber'
                },
                {
                    title: "生日",
                    title2: this.$store.state.common.user.birthday,
                    classes:'birthday'
                }
            ]
        };
    },
    methods: {
        upMessage(classes) {
            this.$router.push(`/upmessage/${classes}`);
        }
    }
};
</script>
<style lang="scss">
.portrait {
    height: 100px;
    background: #fff;
    .demo-basic--circle {
        display: flex;
        height: 100px;
        justify-content: space-between;
        align-items: center;
        .topimg {
            width: 90px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
.personal-main {
    padding: 0px 10px;
    background: #fff;
}
.information {
    border-top: 1px solid #999;
    h4 {
        padding: 15px 0px;
        display: flex;
        justify-content: space-between;
        color: #777777;
        i {
            margin-right: 5px;
        }
    }
}
</style>