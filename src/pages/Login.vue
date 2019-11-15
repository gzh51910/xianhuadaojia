<template>
  <div>登陆</div>
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
                        user.Authorization = headers.authorization;
                        this.$store.commit("login", user.Authorization);
                        let redirectUrl = this.$route.query.redirectUrl || "/mine";
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
