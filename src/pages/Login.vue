<template>
    <div>
        <el-form
            label-position="right"
            label-width="60px"
            ref="loginForm"
            :rules="rules"
            style="margin:40px 0px"
            hide-required-asterisk
            :model="loginForm"
        >
            <el-form-item label="用户名" prop="username" :error="errorMsg">
                <el-input v-model="loginForm.username" :style="inputwidth" placeholder="手机/用户名/邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :error="errorMsg">
                <el-input
                    type="password"
                    v-model="loginForm.password"
                    :style="inputwidth"
                    placeholder="密码"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button
                    type="success"
                    class="login-btn"
                    :style="inputwidth"
                    @click="submitForm('numberValidateForm')"
                >登录</el-button>
            </el-form-item>
        </el-form>
        <div class="login-out-sub-txt">
            <span @click="$router.push('*');">忘记密码?</span>
            <span @click="$router.push('/reg');">立即注册</span>
        </div>
       <contact />
    </div>
</template>
<script>
import contact from './contact'
import { my } from "../api";
export default {
    data() {
        return {
            inputwidth: "width:320px",
            errorMsg: "",
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 12,
                        message: "长度在 3 到 12 个字符",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    let { username, password } = this.loginForm;
                    let result = await my.get("/login", {
                        username,
                        password
                    });
                    let { data, headers } = result;
                    if (data.status === 0) {
                        this.errorMsg = "用户名或密码错误";
                    } else {
                        let user = data.data[0];
                        // 从响应头中获取Authorization
                        user.Authorization = headers.authorization;
                        this.$store.commit("login", user);
                        let redirectUrl =
                            this.$route.query.redirectUrl || "/mine";
                        this.$router.push(redirectUrl);
                    }
                } else {
                    return false;
                }
            });
        }
    },
    components:{
      contact
    }
};
</script>
<style lang="scss">
body {
    background-color: #eeeff0;
}
.login-out-sub-txt {
    overflow: hidden;
    color: #999;
    font-size: 14px;
    padding: 0px 15px;
    display: flex;
    justify-content: space-between;
    span {
        color: #4685ee;
        text-decoration: none;
    }
}
</style>
