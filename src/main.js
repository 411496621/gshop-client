import Vue from "vue"
import App from "./App"
import router from './router'
import NavHeader from "./components/NavHeader/NavHeader"
import Stars from "./components/Stars/Stars"
import store from "./store"
Vue.component('NavHeader',NavHeader)
Vue.component("Stars",Stars)
new Vue({  /*配置对象*/
  el:'#app',
  render:h=>h(App),
  router,
  store
})
