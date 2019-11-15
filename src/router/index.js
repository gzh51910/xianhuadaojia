import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

import {
    my
} from "../api";
//懒加载
const Home = () => import('../pages/Home.vue');
const Reg = () => import('../pages/Reg.vue');
const Login = () => import('../pages/Login.vue');
const Mine = () => import('../pages/Mine.vue');
const Cart = () => import('../pages/Cart.vue');
const Goods = () => import('../pages/Goods.vue');
const Elder = () => import('../pages/Elder.vue');
const Friend = () => import('../pages/Friend.vue');
const Lover = () => import('../pages/Lover.vue');
const Perspnal = () => import('../pages/Perspnal.vue');
const NotFound = () => import('../pages/NotFound.vue');
const upMessage = () => import('../pages/upMessage.vue');
const router = new VueRouter({
    routes: [{
            name: "home",
            path: "/home",
            component: Home
        },
        {
            name: "elder",
            path: "/elder",
            component: Elder
        },
        {
            name: "friend",
            path: "/friend",
            component: Friend
        },
        {
            name: "lover",
            path: "/lover",
            component: Lover
        },
        {
            name: "goods",
            path: "/goods/:id",
            component: Goods
        },
        {
            path: "/",
            redirect: "/home"
        },
        {
            name: "reg",
            path: "/reg",
            component: Reg
        },
        {
            name: "login",
            path: "/login",
            component: Login
        },
        {
            name: "mine",
            path: "/mine",
            component: Mine,
            meta: {
                requiresAuth: true
            }
        },
        {
            name: "personal",
            path: "/personal",
            component: Perspnal
        },
        {
            name: "upmessage",
            path: "/upmessage/:id",
            component: upMessage
        },
        {
            name: "cart",
            path: "/cart",
            component: Cart,
            meta: {
                requiresAuth: true
            }
        },

        // 404页面
        {
            name: "404",
            path: "*",
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        let $store = router.app.$store;
        let Authorization = $store.state.common.user.Authorization;
        if (Authorization) {
            next();
            my.get("/verify", {
                headers: {
                    Authorization
                }
            }).then(({
                data
            }) => {
                if (data.state === 0) {
                    $store.commit("login");
                    next({
                        path: "login",
                        query: {
                            redirectUrl: to.fullPath
                        }
                    });
                }
            });
        } else {
            next({
                path: "login",
                query: {
                    redirectUrl: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});

export default router;