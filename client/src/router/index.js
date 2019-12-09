import Vue from 'vue'
import auth from '@/store/modules/auth'
import store from '@/store/index'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      console.log(auth.state.token)
      if(auth.state.token) {
        next()
      }else {
        next('/login')
      }
    }
    // beforeEnter: (to, from, next) => {
    //   console.log(auth.state.token)
    //   if(auth.state.token) {
    //     next()
    //   }else {
    //     next('/login')
    //   }
    // }
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter (to, from, next) {
      store.dispatch('auth/logout')
        .then(() => next({name: 'login'}))
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }

  // {
  //   path:'/dashbord',
  //   name:'Dashbor'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
