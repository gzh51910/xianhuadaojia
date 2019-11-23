<template>
    <div>
        <div class="upmessage">
            <div class="upinput">
                <label for>{{inform.title}}</label>
                <input type="text" :placeholder="inform.title2" v-model="txtval" />
            </div>
            <div class="upbutton">
                <button class="upbtn" @click="additem">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
import { my } from "../api";
// import { log } from 'util';
export default {
    data() {
        return {
            information: [
                {
                    title: "昵称",
                    title2: "请输入用户名",
                    classes: "username"
                },
                {
                    title: "邮箱地址",
                    title2: "请输入邮箱地址",
                    classes: "email"
                },
                {
                    title: "手机号码",
                    title2: "请输入手机号码",
                    classes: "phone"
                },
                {
                    title: "真实姓名",
                    title2: "请输入真是姓名",
                    classes: "realname"
                },
                {
                    title: "身份证号码",
                    title2: "请输入身份证号码",
                    classes: "idnumber"
                },
                {
                    title: "生日",
                    title2: "请输入生日日期",
                    classes: "birthday"
                }
            ],
            inform: {
                title: "",
                title2: "",
                classes: ""
            },
            txtval: ""
        };
    },
    methods: {
        async additem() {
            let { id } = this.$route.params;
            let Authorization = this.$store.state.common.user.Authorization
            let result = await my.patch(
                `user/${this.$store.state.common.user._id}`,
                { [id]: this.txtval }
            );
            if (result.data.status == 1) {
                let data = await my.get(
                    `user/${this.$store.state.common.user._id}`
                );
                let user = data.data.data[0];
                user.Authorization = Authorization;
                this.$store.commit("login", user);
                this.$router.push("/personal");
            } else {
                this.$router.push("/personal");
            }
        }
    },
    beforeMount() {
        let { id } = this.$route.params;
        this.txtval = this.$store.state.common.user[`${id}`];
        this.information.forEach(item => {
            if (item.classes === id) {
                this.inform = {
                    title: item.title,
                    title2: item.title2,
                    classes: item.classes
                };
            }
        });
    }
};
</script>
<style lang="scss">
.upmessage {
    width: 100%;
    margin-top: 46px;
    .upinput {
        border-top: 0.5px solid #d5d5d5;
        border-bottom: 0.5px solid #d5d5d5;
        padding: 0 15px;
        background-color: #fff;
        line-height: 44px;
        input {
            line-height: 44px;
            margin-left: 10px;
            width: 70%;
        }
    }
    .upbutton {
        margin: 20px 15px 15px;
        .upbtn {
            width: 100%;
            color: #fff;
            background-color: #de004c;
            border-color: #de004c;
            font-size: 14px;
            display: block;
            line-height: 42px;
            border-radius: 3px;
        }
    }
}
</style>