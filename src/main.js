import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

router.beforeEach((to, from ,next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})


new Vue({
  render: h => h(App),
  router,
  render: h => h(App)
}).$mount('#app')