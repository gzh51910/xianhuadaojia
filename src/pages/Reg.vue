<template>
    <div>
        <el-form
            label-position="right"
            label-width="80px"
            ref="regForm"
            :rules="rules"
            style="margin:40px 0px"
            hide-required-asterisk
            :model="regForm"
        >
            <el-form-item label="用户名" prop="username" :error="errorMsg">
                <el-input
                    v-model="regForm.username"
                    :style="inputwidth"
                    placeholder="手机/用户名/邮箱"
                    @input="checkPassw(regForm.username)"
                ></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="checkpassw" :error="errorMsg" v-show="phone?true:false">
                <el-input v-model="regForm.auth" style="width:210px" placeholder="请输入验证码"></el-input>
                <el-button>获取验证码</el-button>
            </el-form-item>
            <el-form-item label="设置密码" prop="password" :error="errorMsg">
                <el-input
                    type="password"
                    v-model="regForm.password"
                    :style="inputwidth"
                    placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repetitionpasswprd" :error="errorMsg">
                <el-input
                    type="password"
                    v-model="regForm.repetitionpasswprd"
                    :style="inputwidth"
                    placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="success"
                    class="reg-btn"
                    :style="inputwidth"
                    @click="submitForm('numberValidateForm')"
                >注册</el-button>
            </el-form-item>
        </el-form>
        <div class="reg-out-sub">
            <span>
                已有账号? 请
                <i @click="$router.push('/login')">直接登录</i>
            </span>
        </div>
        <contact />
    </div>
</template>
<script>
import contact from "./contact";
// import { my } from "../api";
export default {
    data() {
        let checkUsername = (rule, value, callback) => {
            if (!/^[\w-]+$/i.test(value)) {
                callback(new Error("用户名必须为数字、字母、_、-"));
            } else {
                callback();
            }
        };

        let checkPassword = (rule, value, callback) => {
            if (value !== this.regForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            inputwidth: "width:320px",
            errorMsg: "",
            phone: false,
            regForm: {
                username: "",
                password: "",
                repetitionpasswprd: "",
                auth: ""
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
                    },
                    { validator: checkUsername, trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur"
                    }
                ],
                repetitionpasswprd: [
                    { validator: checkPassword, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        checkPassw(value) {
            if (/^1[3-9]\d{9}$/.test(value)) {
                this.phone = true;
            } else {
                this.phone = false;
            }
        },
        submitForm() {
            this.$refs.regForm.validate(async valid => {
                if (valid) {
                    let { password, username } = this.regForm;
                    
                }
            });
        }
    },
    components: {
        contact
    }
};
</script>
<style lang="scss">
.reg-out-sub {
    overflow: hidden;
    color: #999;
    font-size: 14px;
    padding: 0px 15px;
    i {
        color: #4685ee;
    }
}
</style>