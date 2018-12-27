import Vue from 'vue'
import VueRouter from "vue-router"
import routes from "./routes"

Vue.use(VueRouter)

export default new VueRouter({
  mode:'history', // 去掉url中的#
  routes
})
