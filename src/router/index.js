import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home/Home'
import Category from '../views/category/Category'
import Shopcart from '../views/shopcart/Shopcart'
import Profile from '../views/profile/Profile'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router