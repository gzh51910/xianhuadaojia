<<<<<<< HEAD
=======
import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "../pages/Home.vue";
import Reg from "../pages/Reg.vue";
import Login from "../pages/Login.vue";
import Mine from "../pages/Mine.vue";
import Cart from "../pages/Cart.vue";
import Goods from "../pages/Goods.vue";
import Elder from "../pages/Elder.vue";
import Friend from "../pages/Friend.vue";
import Lover from "../pages/Lover.vue";
import NotFound from "../pages/NotFound.vue";
import { TabPane } from "element-ui";
import { my } from "../api";
//懒加载
// const Home = () => import('./Home.vue');
// const Reg = () => import('./Reg.vue');
// const Login = () => import('./Login.vue');
// const Mine = () => import('./Mine.vue');
// const Cart = () => import('./Cart.vue');
// const Goods = () => import('./Goods.vue');
// const Elder = () => import('./Elder.vue');
// const Friend = () => import('./Friend.vue');
// const Lover = () => import('./Lover.vue');
// const NotFound = () => import('./NotFound.vue');
const router = new VueRouter({
  routes: [
    {
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
        component: Login,
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let $store = router.app.$store;
      let Authorization = $store.state.common.user;
    if (Authorization) {
      next();
      my.get("/verify", {
        headers: { Authorization }
      }).then(({ data }) => {
        if (data.state === 0) {
          $store.commit("login");
          next({
            path: "login",
            query: { redirectUrl: to.fullPath }
          });
        }
      });
    } else {
      next({
        path: "login",
        query: { redirectUrl: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
>>>>>>> parent of 6efd51d... 11-15
