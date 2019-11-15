import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);
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
const NotFound = () => import('../pages/NotFound.vue');
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



export default router;