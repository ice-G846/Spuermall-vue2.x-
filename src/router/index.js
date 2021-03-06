import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcart = () => import('../views/shopcart/ShopCart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
const OrderForm = () => import('../views/orderform/Orderform')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'home',
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: 'category'
    }
  },
  {
    path: '/shopcart',
    component: Shopcart,
    meta: {
      title: 'shopcart'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: 'profile'
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: 'detail',
    }
  },
  {
    path: '/orderform',
    component: OrderForm,
    meta: {
      title: 'orderform'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router