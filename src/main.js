import Vue from "vue"
import {Button} from "mint-ui"
import App from "./App"
import router from './router'
import NavHeader from "./components/NavHeader/NavHeader"
import Stars from "./components/Stars/Stars"
import store from "./store"
import CartControl from './components/CartControl/CartControl'
import './mock/mockServer'

Vue.component('NavHeader',NavHeader)
Vue.component("Stars",Stars)
Vue.component('CartControl',CartControl)
Vue.component(Button.name,Button)
new Vue({  /*配置对象*/
  el:'#app',
  render:h=>h(App),
  router,
  store
})
