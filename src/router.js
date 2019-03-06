import Vue from 'vue'
import store from './store.js'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.uid && to.name !== 'login') {
    next({name: 'login'});
  } else {
    next();
  }
});

export default router;
