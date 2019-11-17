import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);
import {
  my
} from "../api";
//懒加载
const Home = () => import("../pages/Home.vue");
const Reg = () => import("../pages/Reg.vue");
const Login = () => import("../pages/Login.vue");
const Mine = () => import("../pages/Mine.vue");
const Cart = () => import("../pages/Cart.vue");
const Goods = () => import("../pages/Goods.vue");
const Elder = () => import("../pages/Elder.vue");
const Friend = () => import("../pages/Friend.vue");
const Lover = () => import("../pages/Lover.vue");
const Personal = () => import("../pages/Personal.vue");
const NotFound = () => import("../pages/NotFound.vue");
const upMessage = () => import("../pages/upMessage.vue");
const Immortal = () => import("../pages/Immortal.vue");
const Mmaterials = () => import("../pages/Mmaterials.vue");
const Subscription = () => import("../pages/Subscription.vue");
const Brand = () => import("../pages/Brand.vue");
const Business = () => import("../pages/Business.vue");
const Seek = () => import("../pages/Seek.vue");
const Advertising = () => import("../pages/Advertising.vue");
const router = new VueRouter({
  routes: [{
      name: "home",
      path: "/home",
      component: Home,
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
      component: Goods,
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
      name: "advertising",
      path: "/advertising",
      component: Advertising
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
      component: Personal
    },
    {
      name: "upmessage",
      path: "/upmessage/:id",
      component: upMessage
    },
    {
      name: "seek",
      path: "/seek",
      component: Seek
    },
    {
      name: "immortal",
      path: "/immortal",
      component: Immortal
    },
    {
      name: "mmaterials",
      path: "/mmaterials",
      component: Mmaterials
    },
    {
      name: "subscription",
      path: "/subscription",
      component: Subscription
    },
    {
      name: "brand",
      path: "/brand",
      component: Brand
    },
    {
      name: "business",
      path: "/business",
      component: Business
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